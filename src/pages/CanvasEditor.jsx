import React, { useCallback, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { templates } from "@/TemplateData";
import { useCanvasEngine } from "@/hooks/useCanvasEngine";
import { EditorLayout } from "@/components/editor/EditorLayout";
import { EditorToolbar } from "@/components/editor/EditorToolbar";
import { ToolsPanel } from "@/components/editor/ToolsPanel";
import { PropertiesPanel } from "@/components/editor/PropertiesPanel";
import { CanvasArea } from "@/components/editor/CanvasArea";
import ErrorBoundary from "@/components/ErrorBoundary";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download } from "lucide-react";

const CANVAS_WIDTH = 620;
const CANVAS_HEIGHT = 750;

const EditorContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const template = useMemo(
    () => (id ? templates.find((t) => t.id === Number(id)) : null),
    [id]
  );

  const engine = useCanvasEngine({
    templateId: id || null,
    initialBgUrl: template?.backgroundImage || null,
    initialShapes: template?.shapes || [],
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
  });

  const {
    shapes,
    setShapes,
    selectedId,
    setSelectedId,
    backgroundImage,
    stageRef,
    trRef,
    stageState,
    setStageState,
    addText,
    addRect,
    addCircle,
    addTriangle,
    addStar,
    addLine,
    addArrow,
    deleteSelected,
    setColor,
    importImageFromFile,
    importImageFromUrl,
    undo,
    redo,
    handleWheel,
    updateShape,
  } = engine;

  const [currentTool, setCurrentTool] = useState("select");
  const [placingTool, setPlacingTool] = useState(null);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState("png");
  const [exportQuality, setExportQuality] = useState(2);

  // History tracking
  const historyRef = useRef({ past: [], future: [] });
  const canUndo = historyRef.current.past.length > 0;
  const canRedo = historyRef.current.future.length > 0;

  // Place shape listener
  React.useEffect(() => {
    const handlePlaceShape = (e) => {
      const { x, y } = e.detail;
      const id = Date.now();
      let newShape = null;

      switch (placingTool) {
        case "text":
          newShape = {
            id,
            type: "text",
            text: "New Text",
            x,
            y,
            fontSize: 24,
            fontFamily: "Arial",
            fill: "#000",
            textAlign: "left",
            isBold: false,
            isItalic: false,
          };
          break;
        case "rect":
          newShape = {
            id,
            type: "rect",
            x,
            y,
            width: 120,
            height: 80,
            fill: "#4b5563",
            stroke: "#000",
            strokeWidth: 1,
          };
          break;
        case "circle":
          newShape = {
            id,
            type: "circle",
            x,
            y,
            radius: 50,
            fill: "#6b7280",
            stroke: "#000",
            strokeWidth: 1,
          };
          break;
        case "triangle":
          newShape = {
            id,
            type: "triangle",
            x,
            y,
            radius: 60,
            sides: 3,
            fill: "#9ca3af",
            stroke: "#000",
            strokeWidth: 1,
          };
          break;
        case "star":
          newShape = {
            id,
            type: "star",
            x,
            y,
            numPoints: 5,
            innerRadius: 20,
            outerRadius: 40,
            fill: "#94a3b8",
            stroke: "#000",
            strokeWidth: 1,
          };
          break;
        default:
          break;
      }

      if (newShape) {
        setShapes((prev) => [...prev, newShape]);
        setSelectedId(id);
      }
    };

    window.addEventListener("placeShape", handlePlaceShape);
    return () => window.removeEventListener("placeShape", handlePlaceShape);
  }, [placingTool, setShapes, setSelectedId]);

  // Tool actions
  const handleAddText = useCallback(() => {
    setCurrentTool("text");
    setPlacingTool("text");
  }, []);

  const handleAddShape = useCallback((type) => {
    setCurrentTool(type);
    setPlacingTool(type);
  }, []);

  const handleAddImage = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file) importImageFromFile(file);
      e.target.value = "";
    },
    [importImageFromFile]
  );

  const handleAddSticker = useCallback(
    (emoji) => {
      const id = Date.now();
      const newShape = {
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
      };
      setShapes((prev) => [...prev, newShape]);
      setSelectedId(id);
    },
    [setShapes, setSelectedId]
  );

  // Zoom
  const handleZoomIn = useCallback(() => {
    setStageState((s) => ({ ...s, scale: Math.min(s.scale * 1.2, 5) }));
  }, [setStageState]);

  const handleZoomOut = useCallback(() => {
    setStageState((s) => ({ ...s, scale: Math.max(s.scale / 1.2, 0.1) }));
  }, [setStageState]);

  const handleZoomReset = useCallback(() => {
    setStageState({ scale: 1, x: 0, y: 0, draggable: false });
  }, [setStageState]);



  // Export
  const exportDataURL = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return null;
    const prev = {
      x: stage.x(),
      y: stage.y(),
      scaleX: stage.scaleX(),
      scaleY: stage.scaleY(),
    };
    stage.position({ x: 0, y: 0 });
    stage.scale({ x: 1, y: 1 });
    const uri = stage.toDataURL({ pixelRatio: exportQuality, mimeType: `image/${exportFormat}` });
    stage.position({ x: prev.x, y: prev.y });
    stage.scale({ x: prev.scaleX, y: prev.scaleY });
    return uri;
  }, [stageRef, exportQuality, exportFormat]);

  const handleExportPNG = useCallback(() => {
    const uri = exportDataURL();
    if (!uri) return;
    const link = document.createElement("a");
    link.download = `wedding-card-${Date.now()}.${exportFormat}`;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setExportModalOpen(false);
  }, [exportDataURL, exportFormat]);

  const handleExportPDF = useCallback(() => {
    if (!stageRef.current) return;
    const uri = exportDataURL();
    if (!uri) return;
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [CANVAS_WIDTH, CANVAS_HEIGHT],
    });
    pdf.addImage(uri, "PNG", 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    pdf.save(`wedding-card-${Date.now()}.pdf`);
    setExportModalOpen(false);
  }, [stageRef, exportDataURL]);

  // Properties panel
  const selectedShape = useMemo(
    () => shapes.find((s) => s.id === selectedId),
    [shapes, selectedId]
  );

  const handleUpdateShape = useCallback(
    (patch) => {
      if (!selectedId) return;
      updateShape(selectedId, patch);
    },
    [selectedId, updateShape]
  );

  const handleDuplicate = useCallback(() => {
    if (!selectedShape) return;
    const copy = {
      ...selectedShape,
      id: Date.now(),
      x: (selectedShape.x || 0) + 20,
      y: (selectedShape.y || 0) + 20,
    };
    setShapes((prev) => [...prev, copy]);
    setSelectedId(copy.id);
  }, [selectedShape, setShapes, setSelectedId]);

  const handleLayerAction = useCallback(
    (action) => {
      const idx = shapes.findIndex((x) => x.id === selectedId);
      if (idx === -1) return;

      let next = [...shapes];
      const [item] = next.splice(idx, 1);

      if (action === "front") {
        next.push(item);
      } else if (action === "back") {
        next.unshift(item);
      }

      setShapes(next);
    },
    [selectedId, shapes, setShapes]
  );

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <EditorLayout
        topToolbar={
          <EditorToolbar
            onUndo={undo}
            onRedo={redo}
            canUndo={canUndo}
            canRedo={canRedo}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onZoomReset={handleZoomReset}
            zoomLevel={stageState.scale * 100}
            onExport={() => setExportModalOpen(true)}
            onSelectMode={() => {
              setCurrentTool("select");
              setPlacingTool(null);
            }}
            onAddText={handleAddText}
            onAddShape={handleAddShape}
            onAddImage={handleAddImage}
            currentTool={currentTool}
          />
        }
        leftPanel={
          <ToolsPanel
            onAddShape={handleAddShape}
            onAddImage={handleAddImage}
            onAddSticker={handleAddSticker}
          />
        }
        rightPanel={
          <PropertiesPanel
            selectedShape={selectedShape}
            onUpdate={handleUpdateShape}
            onDelete={deleteSelected}
            onDuplicate={handleDuplicate}
            onLayerAction={handleLayerAction}
          />
        }
        canvas={
          <CanvasArea
            shapes={shapes}
            setShapes={setShapes}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            backgroundImage={backgroundImage}
            stageRef={stageRef}
            trRef={trRef}
            stageState={stageState}
            setStageState={setStageState}
            handleWheel={handleWheel}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            placingTool={placingTool}
            setPlacingTool={setPlacingTool}
          />
        }
      />

      {/* Export Modal */}
      <Dialog open={exportModalOpen} onOpenChange={setExportModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Export Design</DialogTitle>
            <DialogDescription>
              Choose format and quality settings for your wedding card
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="format">Format</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger id="format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG (Recommended)</SelectItem>
                  <SelectItem value="jpeg">JPEG</SelectItem>
                  <SelectItem value="pdf-special">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quality">Quality (Resolution Multiplier)</Label>
              <Select
                value={String(exportQuality)}
                onValueChange={(v) => setExportQuality(Number(v))}
              >
                <SelectTrigger id="quality">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Standard (1x)</SelectItem>
                  <SelectItem value="2">High (2x)</SelectItem>
                  <SelectItem value="3">Ultra (3x)</SelectItem>
                  <SelectItem value="4">Print (4x)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-xs text-neutral-500">
              <p>Canvas size: {CANVAS_WIDTH} × {CANVAS_HEIGHT} pixels</p>
              <p>
                Export size: {CANVAS_WIDTH * exportQuality} ×{" "}
                {CANVAS_HEIGHT * exportQuality} pixels
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setExportModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={
                exportFormat === "pdf-special" ? handleExportPDF : handleExportPNG
              }
              className="flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const CanvasEditor = () => {
  return (
    <ErrorBoundary>
      <EditorContent />
    </ErrorBoundary>
  );
};
