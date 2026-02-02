import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useImage from "use-image";

// Generic ID helper
const uid = () => Date.now() + Math.floor(Math.random() * 1000);

// Defaults for new shapes
const defaultStyles = {
  fill: "#000000",
  stroke: "#000000",
  strokeWidth: 1,
  opacity: 1,
  rotation: 0,
  draggable: true,
};

export function useCanvasEngine({
  templateId = null,
  initialBgUrl = null,
  initialShapes = [],
  width = 620,
  height = 750,
} = {}) {
  const [bgUrl, setBgUrl] = useState(initialBgUrl);
  const [backgroundImage, imageStatus] = useImage(bgUrl, "anonymous");
  const [shapes, setShapes] = useState(initialShapes);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]); // multi-select

  // refs
  const stageRef = useRef(null);
  const trRef = useRef(null);

  // history
  const historyRef = useRef([]);
  const futureRef = useRef([]);

  // zoom and pan
  const scaleBy = 1.05;
  const [stageState, setStageState] = useState({ scale: 1, x: 0, y: 0, draggable: false });

  // Persistence key
  const persistKey = useMemo(() => (templateId ? `editor:${templateId}` : `editor:blank`), [templateId]);

  // Persist/load shapes and bg - but always preserve initialBgUrl
  useEffect(() => {
    try {
      const raw = localStorage.getItem(persistKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.shapes)) {
          setShapes(parsed.shapes);
        }
        // Don't load bgUrl from cache, always use initialBgUrl from template
        if (!initialBgUrl && parsed && parsed.bgUrl !== undefined) {
          setBgUrl(parsed.bgUrl);
        }
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persistKey]);

  // Reset bgUrl when initialBgUrl changes
  useEffect(() => {
    if (initialBgUrl) {
      setBgUrl(initialBgUrl);
    }
  }, [initialBgUrl]);

  useEffect(() => {
    try {
      localStorage.setItem(persistKey, JSON.stringify({ shapes, bgUrl }));
    } catch {}
  }, [persistKey, shapes, bgUrl]);

  // selection transformer update
  useEffect(() => {
    if (!trRef.current) return;
    if (selectedId) {
      const node = trRef.current.getStage().findOne(`#node-${selectedId}`);
      if (node) trRef.current.nodes([node]);
      else trRef.current.nodes([]);
    } else {
      trRef.current.nodes([]);
    }
    trRef.current.getLayer()?.batchDraw();
  }, [selectedId, shapes]);

  // history helpers
  const pushHistory = useCallback(
    (nextShapes) => {
      historyRef.current.push(JSON.stringify(nextShapes));
      // clear future on new action
      futureRef.current = [];
    },
    []
  );

  const undo = useCallback(() => {
    if (historyRef.current.length === 0) return;
    const current = JSON.stringify(shapes);
    const prev = historyRef.current.pop();
    if (prev) {
      futureRef.current.push(current);
      setShapes(JSON.parse(prev));
      setSelectedId(null);
    }
  }, [shapes]);

  const redo = useCallback(() => {
    if (futureRef.current.length === 0) return;
    const current = JSON.stringify(shapes);
    const next = futureRef.current.pop();
    if (next) {
      historyRef.current.push(current);
      setShapes(JSON.parse(next));
      setSelectedId(null);
    }
  }, [shapes]);

  // shape CRUD
  const addShape = useCallback((shape) => {
    setShapes((prev) => {
      const next = [...prev, shape];
      pushHistory(prev);
      return next;
    });
    setSelectedId(shape.id);
    setSelectedIds([]);
  }, [pushHistory]);

  const updateShape = useCallback((id, patch) => {
    setShapes((prev) => {
      const next = prev.map((s) => (s.id === id ? { ...s, ...patch } : s));
      pushHistory(prev);
      return next;
    });
  }, [pushHistory]);

  const deleteSelected = useCallback(() => {
    if (!selectedId && selectedIds.length === 0) return;
    setShapes((prev) => {
      const idsToDelete = selectedIds.length > 0 ? selectedIds : [selectedId];
      const next = prev.filter((s) => !idsToDelete.includes(s.id));
      pushHistory(prev);
      return next;
    });
    setSelectedId(null);
    setSelectedIds([]);
  }, [selectedId, selectedIds, pushHistory]);

  // shape factories
  const addText = useCallback(() => {
    const id = uid();
    addShape({
      id,
      type: "text",
      text: "New Text",
      x: 50,
      y: 50,
      fontSize: 24,
      fontFamily: "Arial",
      isBold: false,
      isItalic: false,
      textAlign: "left",
      ...defaultStyles,
    });
  }, [addShape]);

  const addRect = useCallback(() => {
    const id = uid();
    addShape({ id, type: "rect", x: 80, y: 80, width: 120, height: 80, cornerRadius: 4, ...defaultStyles, fill: "#4b5563" });
  }, [addShape]);

  const addCircle = useCallback(() => {
    const id = uid();
    addShape({ id, type: "circle", x: 180, y: 180, radius: 50, ...defaultStyles, fill: "#6b7280" });
  }, [addShape]);

  const addLine = useCallback(() => {
    const id = uid();
    addShape({ id, type: "line", points: [50, 50, 200, 200], stroke: "#111827", strokeWidth: 3, ...defaultStyles });
  }, [addShape]);

  const addArrow = useCallback(() => {
    const id = uid();
    addShape({ id, type: "arrow", points: [60, 60, 220, 60], stroke: "#111827", strokeWidth: 3, pointerLength: 12, pointerWidth: 12, ...defaultStyles });
  }, [addShape]);

  const addTriangle = useCallback(() => {
    const id = uid();
    addShape({ id, type: "triangle", x: 220, y: 220, radius: 60, sides: 3, ...defaultStyles, fill: "#9ca3af" });
  }, [addShape]);

  const addStar = useCallback(() => {
    const id = uid();
    addShape({ id, type: "star", x: 280, y: 180, numPoints: 5, innerRadius: 20, outerRadius: 40, ...defaultStyles, fill: "#94a3b8" });
  }, [addShape]);

  // import image
  const addImageFromElement = useCallback((imgEl) => {
    const id = uid();
    addShape({ id, type: "image", x: 100, y: 100, width: imgEl.naturalWidth, height: imgEl.naturalHeight, imageSrc: imgEl.src, ...defaultStyles });
  }, [addShape]);

  const importImageFromFile = useCallback((file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => addImageFromElement(img);
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }, [addImageFromElement]);

  const importImageFromUrl = useCallback((url) => {
    if (!url) return;
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => addImageFromElement(img);
    img.src = url;
  }, [addImageFromElement]);

  const addSticker = useCallback((emoji) => {
    if (!emoji) return;
    // Add emoji as text element instead of loading SVG files
    const id = uid();
    addShape({
      id,
      type: "text",
      text: emoji,
      x: 260,
      y: 320,
      fontSize: 48,
      fill: "#000",
      fontFamily: "Arial",
      textAlign: "center",
      isBold: false,
      isItalic: false,
      ...defaultStyles,
    });
  }, [addShape]);

  // color handling (applies to text fill or shapes fill/stroke)
  const setColor = useCallback((color) => {
    if (!selectedId) return;
    setShapes((prev) => {
      const next = prev.map((s) => {
        if (s.id !== selectedId) return s;
        if (s.type === "line" || s.type === "arrow") return { ...s, stroke: color };
        if (s.type === "image") return s; // skip for images
        // for text, rect, circle
        return { ...s, fill: color };
      });
      pushHistory(prev);
      return next;
    });
  }, [selectedId, pushHistory]);

  // drag & drop import
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const container = stage.container();
    const prevent = (e) => e.preventDefault();
    const onDrop = (e) => {
      e.preventDefault();
      const dt = e.dataTransfer;
      if (dt?.files && dt.files.length > 0) {
        const file = dt.files[0];
        importImageFromFile(file);
      } else {
        const url = dt?.getData("text/uri-list") || dt?.getData("text/plain");
        if (url) importImageFromUrl(url);
      }
    };
    container.addEventListener("dragover", prevent);
    container.addEventListener("drop", onDrop);
    return () => {
      container.removeEventListener("dragover", prevent);
      container.removeEventListener("drop", onDrop);
    };
  }, [importImageFromFile, importImageFromUrl]);

  // wheel zoom (Ctrl/Cmd + wheel)
  const handleWheel = useCallback((e) => {
    e.evt.preventDefault();
    const stage = stageRef.current;
    if (!stage) return;
    const oldScale = stageState.scale;
    const pointer = stage.getPointerPosition();
    if (!pointer) return;
    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const direction = e.evt.deltaY > 0 ? -1 : 1;
    const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    setStageState((s) => ({ ...s, scale: newScale, x: newPos.x, y: newPos.y }));
  }, [scaleBy, stageState.scale]);

  // public API
  return {
    // state
    shapes,
    setShapes,
    selectedId,
    setSelectedId,
    selectedIds,
    setSelectedIds,
    bgUrl,
    setBgUrl,
    backgroundImage,
    stageRef,
    trRef,
    stageState,
    setStageState,

    // shape actions
    addText,
    addRect,
    addCircle,
    addLine,
    addArrow,
    addTriangle,
    addStar,
    updateShape,
    deleteSelected,
    setColor,
    importImageFromFile,
    importImageFromUrl,
    addSticker,
    undo,
    redo,
    handleWheel,

    // helpers
    width,
    height,
  };
}
