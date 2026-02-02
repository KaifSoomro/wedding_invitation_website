import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Stage,
  Layer,
  Text,
  Transformer,
  Image as KonvaImage,
  Rect,
  Circle,
  Line,
  Arrow,
  RegularPolygon,
  Star,
} from "react-konva";
import { useParams } from "react-router-dom";
import { templates } from "@/TemplateData";
import { templateStorage } from "@/services/templateStorage";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import fonts from "../fontData.js";
import colorPickerImage from "../assets/images/colorPicker.png";
import { LuAlignLeft } from "react-icons/lu";
import { LuAlignCenter } from "react-icons/lu";
import { LuAlignRight } from "react-icons/lu";
import { FaBold } from "react-icons/fa";
import { VscItalic } from "react-icons/vsc";
import { CiText } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import fontSizeData from "@/fontSizeData.js";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdArrowForwardIos } from "react-icons/md";
import { IoImageOutline } from "react-icons/io5";
import { GrDocumentPdf } from "react-icons/gr";
import { jsPDF } from "jspdf";
import { useCanvasEngine } from "@/hooks/useCanvasEngine";
import useImage from "use-image";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const NewEditor = () => {
  const { id } = useParams();
  const STAGE_WIDTH = 620;
  const STAGE_HEIGHT = 750;

  // Load template from merged sources (built-in + localStorage)
  const template = useMemo(() => {
    const mergedTemplates = templateStorage.getMergedTemplates(templates);
    const found = mergedTemplates.find((t) => t.id === Number(id));
    
    if (!found) {
      console.warn(`Template with ID ${id} not found`);
    }
    
    return found;
  }, [id]);

  const engine = useCanvasEngine({
    templateId: id || null,
    initialBgUrl: template?.backgroundImage || null,
    initialShapes: template?.shapes || [],
    width: STAGE_WIDTH,
    height: STAGE_HEIGHT,
  });

  const {
    shapes,
    setShapes,
    selectedId,
    setSelectedId,
    bgUrl,
    backgroundImage,
    stageRef,
    trRef,
    stageState,
    setStageState,
    addText,
    deleteSelected,
    setColor,
    handleWheel,
    importImageFromFile,
    importImageFromUrl,
    shortcutsEnabled,
    setShortcutsEnabled,
  } = engine;

  const [inlineEdit, setInlineEdit] = useState({ id: null, value: "", x: 0, y: 0 });
  const commitInlineEdit = useCallback(() => {
    if (!inlineEdit.id) return;
    setShapes((prev) => prev.map((s) => (s.id === inlineEdit.id ? { ...s, text: inlineEdit.value } : s)));
    setInlineEdit({ id: null, value: "", x: 0, y: 0 });
  }, [inlineEdit, setShapes]);

  // reorder and duplicate helpers
  const duplicateSelected = useCallback(() => {
    const s = shapes.find((x) => x.id === selectedId);
    if (!s) return;
    const copy = { ...s, id: Date.now(), x: (s.x || 0) + 20, y: (s.y || 0) + 20 };
    setShapes((prev) => [...prev, copy]);
    setSelectedId(copy.id);
  }, [selectedId, setShapes, setSelectedId, shapes]);

  const bringForward = useCallback(() => {
    const idx = shapes.findIndex((x) => x.id === selectedId);
    if (idx === -1 || idx === shapes.length - 1) return;
    const next = [...shapes];
    const [item] = next.splice(idx, 1);
    next.splice(idx + 1, 0, item);
    setShapes(next);
  }, [selectedId, shapes, setShapes]);

  const sendBackward = useCallback(() => {
    const idx = shapes.findIndex((x) => x.id === selectedId);
    if (idx <= 0) return;
    const next = [...shapes];
    const [item] = next.splice(idx, 1);
    next.splice(idx - 1, 0, item);
    setShapes(next);
  }, [selectedId, shapes, setShapes]);

  const colors = [
    { value: "bg-red-600", hoverColor: "hover:bg-red-600", color: "red" },
    { value: "bg-pink-500", hoverColor: "hover:bg-pink-400", color: "#ec4899" },
    {
      value: "bg-yellow-400",
      hoverColor: "hover:bg-yellow-300",
      color: "#facc15",
    },
    {
      value: "bg-green-400",
      hoverColor: "hover:bg-green-300",
      color: "#4ade80",
    },
    {
      value: "bg-purple-500",
      hoverColor: "hover:bg-purple-400",
      color: "#a855f7",
    },
    {
      value: "bg-black",
      hoverColor: "hover:bg-gray-800",
      color: "#000",
    },
    {
      value: "bg-indigo-600",
      hoverColor: "hover:bg-indigo-500",
      color: "#4f46e5",
    },
  ];

  const [bgElement] = useImage(bgUrl, "anonymous");

  const handleTextChange = useCallback((text) => {
    setShapes((prev) => prev.map((s) => (s.id === selectedId ? { ...s, text } : s)));
  }, [selectedId, setShapes]);

  const handleColorChange = useCallback((color) => {
    setColor(color);
  }, [setColor]);

  const handleDownload = () => {
    if (!stageRef.current) return;

    trRef.current.nodes([]);

    const uri = stageRef.current.toDataURL({
      pixelRatio: 2,
      mimeType: "image/png",
    });

    if (selectedId && shapeRefs.current[selectedId]) {
      trRef.current.nodes([shapeRefs.current[selectedId]]);
    }

    const link = document.createElement("a");
    const newName = Date.now();
    link.download = newName+"invitation.png";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePDFDownload = () => {
    if (!stageRef.current) return;

    trRef.current.nodes([]);

    const uri = stageRef.current.toDataURL({ pixelRatio: 2 });

    if (selectedId && shapeRefs.current[selectedId]) {
      trRef.current.nodes([shapeRefs.current[selectedId]]);
    }

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [stageRef.current.width(), stageRef.current.height()],
    });

    pdf.addImage(
      uri,
      "PNG",
      0,
      0,
      stageRef.current.width(),
      stageRef.current.height()
    );
    const newName = Date.now();
    pdf.save(newName + "Invitation.pdf");
  };

  const KImg = ({ src, ...rest }) => {
    const [img] = useImage(src, "anonymous");
    return <KonvaImage image={img} {...rest} />;
  };

  const renderShape = useCallback(
    (shape, i) => {
      const common = {
        key: shape.id,
        id: `node-${shape.id}`,
        draggable: true,
        onClick: (e) => {
          e.cancelBubble = true;
          setSelectedId(shape.id);
        },
        onTap: (e) => {
          e.cancelBubble = true;
          setSelectedId(shape.id);
        },
        onDragEnd: (e) => {
          const node = e.target;
          const updated = { ...shape, x: node.x(), y: node.y(), rotation: node.rotation() };
          const next = [...shapes];
          next[i] = updated;
          setShapes(next);
        },
      };

      switch (shape.type) {
        case "text": {
          return (
            <Text
              {...common}
              x={shape.x}
              y={shape.y}
              text={shape.text}
              fontSize={shape.fontSize}
              fill={shape.fill}
              fontStyle={shape.isItalic ? "italic" : "normal"}
              fontWeight={shape.isBold ? "bold" : "normal"}
              align={shape.textAlign || "left"}
              fontFamily={shape.fontFamily || "Arial"}
              opacity={shape.opacity ?? 1}
              letterSpacing={shape.letterSpacing ?? 0}
              lineHeight={shape.lineHeight ?? 1.2}
              stroke={shape.stroke}
              strokeWidth={shape.strokeWidth}
              rotation={shape.rotation || 0}
              onDblClick={() => {
                const stage = stageRef.current;
                if (!stage) return;
                const scale = stage.scaleX();
                const canvasPos = stage.container().getBoundingClientRect();
                const absX = canvasPos.left + shape.x * scale + stage.x();
                const absY = canvasPos.top + shape.y * scale + stage.y();
                setInlineEdit({ id: shape.id, value: shape.text, x: absX, y: absY });
                setSelectedId(shape.id);
                if (trRef.current) trRef.current.nodes([]);
              }}
              onTransformEnd={(e) => {
                const node = e.target;
                const newFontSize = (shape.fontSize || 24) * node.scaleY();
                node.scaleX(1);
                node.scaleY(1);
                const updated = { ...shape, x: node.x(), y: node.y(), fontSize: newFontSize, rotation: node.rotation() };
                const next = [...shapes];
                next[i] = updated;
                setShapes(next);
              }}
            />
          );
        }
        case "rect": {
          return (
            <Rect
              {...common}
              x={shape.x}
              y={shape.y}
              width={shape.width}
              height={shape.height}
              cornerRadius={shape.cornerRadius || 0}
              fill={shape.fill}
              stroke={shape.stroke}
              strokeWidth={shape.strokeWidth}
              onTransformEnd={(e) => {
                const node = e.target;
                const updated = {
                  ...shape,
                  x: node.x(),
                  y: node.y(),
                  width: Math.max(5, shape.width * node.scaleX()),
                  height: Math.max(5, shape.height * node.scaleY()),
                };
                node.scaleX(1);
                node.scaleY(1);
                const next = [...shapes];
                next[i] = updated;
                setShapes(next);
              }}
            />
          );
        }
        case "circle": {
          return (
            <Circle
              {...common}
              x={shape.x}
              y={shape.y}
              radius={shape.radius}
              fill={shape.fill}
              stroke={shape.stroke}
              strokeWidth={shape.strokeWidth}
              onTransformEnd={(e) => {
                const node = e.target;
                const updated = {
                  ...shape,
                  x: node.x(),
                  y: node.y(),
                  radius: Math.max(3, shape.radius * node.scaleX()),
                };
                node.scaleX(1);
                node.scaleY(1);
                const next = [...shapes];
                next[i] = updated;
                setShapes(next);
              }}
            />
          );
        }
        case "line": {
          return (
            <Line
              {...common}
              points={shape.points}
              stroke={shape.stroke}
              strokeWidth={shape.strokeWidth}
            />
          );
        }
        case "arrow": {
          return (
            <Arrow
              {...common}
              points={shape.points}
              stroke={shape.stroke}
              strokeWidth={shape.strokeWidth}
              pointerLength={shape.pointerLength || 10}
              pointerWidth={shape.pointerWidth || 10}
            />
          );
        }
        case "image": {
          return (
            <KImg
              {...common}
              x={shape.x}
              y={shape.y}
              width={shape.width}
              height={shape.height}
              src={shape.imageSrc}
              onTransformEnd={(e) => {
                const node = e.target;
                const updated = {
                  ...shape,
                  x: node.x(),
                  y: node.y(),
                  width: Math.max(5, shape.width * node.scaleX()),
                  height: Math.max(5, shape.height * node.scaleY()),
                };
                node.scaleX(1);
                node.scaleY(1);
                const next = [...shapes];
                next[i] = updated;
                setShapes(next);
              }}
            />
          );
        }
        case "triangle": {
          return (
            <RegularPolygon
              {...common}
              x={shape.x}
              y={shape.y}
              sides={shape.sides || 3}
              radius={shape.radius || 40}
              fill={shape.fill}
              stroke={shape.stroke}
              strokeWidth={shape.strokeWidth}
              onTransformEnd={(e) => {
                const node = e.target;
                const updated = {
                  ...shape,
                  x: node.x(),
                  y: node.y(),
                  radius: Math.max(3, (shape.radius || 40) * node.scaleX()),
                };
                node.scaleX(1);
                node.scaleY(1);
                const next = [...shapes];
                next[i] = updated;
                setShapes(next);
              }}
            />
          );
        }
        case "star": {
          return (
            <Star
              {...common}
              x={shape.x}
              y={shape.y}
              numPoints={shape.numPoints || 5}
              innerRadius={shape.innerRadius || 20}
              outerRadius={shape.outerRadius || 40}
              fill={shape.fill}
              stroke={shape.stroke}
              strokeWidth={shape.strokeWidth}
              onTransformEnd={(e) => {
                const node = e.target;
                const updated = {
                  ...shape,
                  x: node.x(),
                  y: node.y(),
                  innerRadius: Math.max(2, (shape.innerRadius || 20) * node.scaleX()),
                  outerRadius: Math.max(3, (shape.outerRadius || 40) * node.scaleY()),
                };
                node.scaleX(1);
                node.scaleY(1);
                const next = [...shapes];
                next[i] = updated;
                setShapes(next);
              }}
            />
          );
        }
        default:
          return null;
      }
    },
    [setSelectedId, shapes, setShapes]
  );

  const handleAddText = addText;

  const handleDeleteText = deleteSelected;

  const selectedShape = useMemo(() => shapes?.find((shape) => shape?.id === selectedId), [shapes, selectedId]);

  // Image upload helpers
  const fileInputRef = useRef(null);
  const handleUploadClick = () => fileInputRef.current?.click();
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) importImageFromFile(file);
    // reset value so same file can be chosen again
    e.target.value = "";
  };
  const handleAddUrl = () => {
    const url = window.prompt("Paste image URL");
    if (url) importImageFromUrl(url);
  };

  // Click-to-place text mode
  const [placingText, setPlacingText] = useState(false);

  // Emoji catalog and filters
  const emojiCatalog = useMemo(() => ({
    all: ["😀","😁","😂","🤣","😊","😍","😘","😎","🤩","😇","🥳","🤗","👍","🙏","🫶","💖","💍","💐","🎉","✨","🥂","🍾","📸","🎁","🕊️","💒","👰","🤵","👩‍❤️‍👨","👩‍❤️‍👩","👨‍❤️‍👨","💞","💕","💓","💗","💘","💝","❤️","🩷","🧡","💛","💚","💙","💜","🤍","🤎","🖤","⭐","🌟","⚡","✔️","❌","❗","❓","🔔","💡","🎵","🎶"],
    people: ["😀","😁","😂","🤣","😊","😍","😘","😎","🤩","😇","🥳","🤗","👰","🤵","👩‍❤️‍👨","👩‍❤️‍👩","👨‍❤️‍👨"],
    hearts: ["❤️","🩷","💖","💘","💝","💗","💓","💕","💞","💟","🫶"],
    symbols: ["⭐","🌟","✨","⚡","✔️","❌","❗","❓","🔔","💡","🎵","🎶"],
  }), []);
  const [emojiCategory, setEmojiCategory] = useState("all");
  const [emojiSearch, setEmojiSearch] = useState("");
  const filteredEmojis = useMemo(() => {
    const list = emojiCatalog[emojiCategory] || emojiCatalog.all;
    if (!emojiSearch.trim()) return list;
    const q = emojiSearch.trim().toLowerCase();
    const alias = {
      "heart": ["❤️","🩷","💖","💘","💝","💗","💓","💕","💞","💟","🫶"],
      "star": ["⭐","🌟"],
      "music": ["🎵","🎶"],
      "spark": ["✨"],
      "bell": ["🔔"],
      "light": ["💡"],
      "party": ["🎉","🥳","🍾"],
      "ring": ["💍"],
      "gift": ["🎁"],
    };
    const pool = Object.entries(alias)
      .filter(([k]) => k.includes(q))
      .flatMap(([, v]) => v);
    return list.filter((e) => pool.length ? pool.includes(e) : e);
  }, [emojiCatalog, emojiCategory, emojiSearch]);

  return (
    <>
    <div className="w-full h-screen flex items-center justify-center bg-neutral-200">
      {/* Canvas Section */}
      <div
        className="bg-white shadow-md mt-20 overflow-hidden relative"
        style={{ width: STAGE_WIDTH, height: STAGE_HEIGHT }}
      >
        {placingText && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs rounded px-2 py-1 pointer-events-none select-none z-10">
            Click on canvas to add text
          </div>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger className="absolute top-25 right-15 w-[130px] rounded border border-violet-200 hover:border-violet-300 shadow bg-violet-500 text-white py-1 px-2 text-xl flex items-center justify-evenly group">
            Next
            <MdArrowForwardIos className="group-hover:translate-x-1 transition-all" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Button variant={"outline"} onClick={handlePDFDownload}>
                <GrDocumentPdf /> Download as PDF
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button variant={"outline"} onClick={handleDownload}>
                <IoImageOutline /> Download as PNG
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Stage
          width={STAGE_WIDTH}
          height={STAGE_HEIGHT}
          scaleX={stageState.scale}
          scaleY={stageState.scale}
          x={stageState.x}
          y={stageState.y}
          draggable={stageState.draggable}
          onDragEnd={(e) => setStageState((s) => ({ ...s, x: e.target.x(), y: e.target.y() }))}
          ref={stageRef}
          onWheel={handleWheel}
          onMouseDown={(e) => {
            const stage = e.target.getStage();
            const clickedOnEmpty = e.target === stage;
            if (placingText && clickedOnEmpty) {
              const pointer = stage.getPointerPosition();
              const scale = stage.scaleX() || 1;
              const x = (pointer.x - stage.x()) / scale;
              const y = (pointer.y - stage.y()) / scale;
              const newId = Date.now();
              setShapes((prev) => [
                ...prev,
                {
                  id: newId,
                  type: "text",
                  text: "New Text",
                  x,
                  y,
                  fontSize: 24,
                  fill: "black",
                  fontFamily: "Arial",
                  textAlign: "left",
                  isBold: false,
                  isItalic: false,
                },
              ]);
              setSelectedId(newId);
              setPlacingText(false);
              return;
            }
            if (clickedOnEmpty) setSelectedId(null);
          }}
        >
          <Layer>
            {/* Background Image */}
            {bgElement && (
              <KonvaImage
                image={bgElement}
                x={0}
                y={0}
                width={STAGE_WIDTH}
                height={STAGE_HEIGHT}
                listening={false}
                onClick={() => setSelectedId(null)}
              />
            )}

            {/* Editable Shapes */}
            {shapes.map((shape, i) => renderShape(shape, i))}

            {/* Transformer */}
            <Transformer ref={trRef} rotateEnabled={true} enabledAnchors={["top-left","top-right","bottom-left","bottom-right"]} />
          </Layer>
        </Stage>
      </div>

      {/* Sidebar Section */}
      <div className="absolute top-0 left-0 w-[360px] h-full bg-white pt-25 px-5">
        <>
          <h3 className="mb-4 text-xl font-semibold border-b pb-2">
            Edit text
          </h3>
          <textarea
            className="w-full min-h-25 p-2 border rounded resize-none text-2xl"
            value={selectedShape?.text || ""}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Add New Text to Type"
          />
          <h3 className="mb-4 mt-6 text-xl font-semibold border-b pb-2">
            Text style
          </h3>
          <Select
            onValueChange={(font) => {
              setShapes((prevShapes) =>
                prevShapes.map((shape) =>
                  shape.id === selectedId
                    ? { ...shape, fontFamily: font }
                    : shape
                )
              );
            }}
          >
            <SelectTrigger className="w-full text-xl p-2 py-6">
              <SelectValue placeholder="Change font style" />
            </SelectTrigger>
            <SelectContent>
              {fonts.map((f) => (
                <SelectItem key={"key" + f.value + f.name} value={f.value}>
                  {f.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="mt-4 w-full grid grid-cols-3 gap-2">
            <Select
              onValueChange={(align) => {
                setShapes((prevShapes) =>
                  prevShapes.map((shape) =>
                    shape.id === selectedId
                      ? { ...shape, textAlign: align }
                      : shape
                  )
                );
              }}
            >
              <SelectTrigger className="w-auto text-sm p-2 py-4">
                <SelectValue placeholder="Text Align" />
              </SelectTrigger>
              <SelectContent className="text-xl">
                <SelectItem value="left" className="flex items-center gap-2">
                  <LuAlignLeft /> Left
                </SelectItem>
                <SelectItem value="center" className="flex items-center gap-2">
                  <LuAlignCenter /> Center
                </SelectItem>
                <SelectItem value="right" className="flex items-center gap-2">
                  <LuAlignRight /> Right
                </SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={() => {
                setShapes((prevShapes) =>
                  prevShapes.map((shape) =>
                    shape.id === selectedId
                      ? { ...shape, isBold: !shape.isBold }
                      : shape
                  )
                );
              }}
              variant={"outline"}
            >
              <FaBold />
            </Button>

            <Button
              onClick={() => {
                setShapes((prevShapes) =>
                  prevShapes.map((shape) =>
                    shape.id == selectedId
                      ? { ...shape, isItalic: !shape.isItalic }
                      : shape
                  )
                );
              }}
              variant={"outline"}
            >
              <VscItalic />
            </Button>

            <Button onClick={() => setPlacingText(true)} variant={"outline"}>
              <CiText />
            </Button>
            {placingText && (
              <span className="text-xs text-violet-700 self-center">Placing…</span>
            )}

            <Button
              onClick={handleDeleteText}
              variant={"outline"}
              className={
                "bg-red-600 text-white hover:bg-red-500 hover:text-white"
              }
            >
              <RiDeleteBinLine />
            </Button>

            <Select
              onValueChange={(textSize) => {
                setShapes((prevShapes) =>
                  prevShapes.map((shape) =>
                    shape.id === selectedId
                      ? { ...shape, fontSize: textSize }
                      : shape
                  )
                );
              }}
            >
              <SelectTrigger className="w-full text-sm p-2 py-4">
                <SelectValue placeholder="Font Size" />
              </SelectTrigger>
              <SelectContent>
                {fontSizeData.map((f) => (
                  <SelectItem key={f + "key" + "fontSize"} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
                <Button variant={"outline"} onClick={duplicateSelected}>Duplicate</Button>
                <Button variant={"outline"} onClick={bringForward}>Front</Button>
                <Button variant={"outline"} onClick={sendBackward}>Back</Button>
          </div>

          <h3 className="mb-4 mt-6 text-xl font-semibold border-b pb-2">Emoji</h3>
          <div className="flex gap-2 mb-3">
            <Select value={emojiCategory} onValueChange={(v) => setEmojiCategory(v)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="people">People</SelectItem>
                <SelectItem value="hearts">Hearts</SelectItem>
                <SelectItem value="symbols">Symbols</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Search (heart, star, music)"
              value={emojiSearch}
              onChange={(e) => setEmojiSearch(e.target.value)}
              className="max-w-[200px]"
            />
          </div>
          <div className="grid grid-cols-6 gap-2 max-h-40 overflow-auto pr-1">
            {filteredEmojis.map((emo) => (
              <Button
                key={emo}
                variant={"outline"}
                onClick={() => {
                  const newId = Date.now();
                  setShapes((prev) => [
                    ...prev,
                    { id: newId, type: "text", text: emo, x: 260, y: 320, fontSize: 48, fill: "#000", fontFamily: "Arial", textAlign: "center", isBold: false, isItalic: false },
                  ]);
                  setSelectedId(newId);
                }}
                className="px-2 py-1"
              >
                {emo}
              </Button>
            ))}
          </div>

              {selectedShape?.type === "text" && (
                <div className="mt-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm">Letter Spacing</label>
                      <Input
                        type="number"
                        value={selectedShape.letterSpacing ?? 0}
                        onChange={(e) => {
                          const v = parseFloat(e.target.value || 0);
                          setShapes((prev) => prev.map((s) => s.id === selectedId ? { ...s, letterSpacing: v } : s));
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-sm">Line Height</label>
                      <Input
                        type="number"
                        step="0.1"
                        value={selectedShape.lineHeight ?? 1.2}
                        onChange={(e) => {
                          const v = parseFloat(e.target.value || 1.2);
                          setShapes((prev) => prev.map((s) => s.id === selectedId ? { ...s, lineHeight: v } : s));
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 items-end">
                    <div>
                      <label className="text-sm">Stroke Color</label>
                      <Input
                        type="color"
                        value={selectedShape.stroke || "#000000"}
                        onChange={(e) => setShapes((prev) => prev.map((s) => s.id === selectedId ? { ...s, stroke: e.target.value } : s))}
                      />
                    </div>
                    <div>
                      <label className="text-sm">Stroke Width</label>
                      <Slider
                        min={0}
                        max={20}
                        step={1}
                        value={[selectedShape.strokeWidth ?? 0]}
                        onValueChange={([v]) => setShapes((prev) => prev.map((s) => s.id === selectedId ? { ...s, strokeWidth: v } : s))}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm">Opacity</label>
                    <Slider
                      min={0}
                      max={1}
                      step={0.01}
                      value={[selectedShape.opacity ?? 1]}
                      onValueChange={([v]) => setShapes((prev) => prev.map((s) => s.id === selectedId ? { ...s, opacity: v } : s))}
                    />
                  </div>
                </div>
              )}

          <h3 className="mb-4 mt-6 text-xl font-semibold border-b pb-2">
            Colors
          </h3>
          <div className="w-full flex flex-wrap gap-3 mt-5">
            {colors.map((c) => (
              <Button
                key={c.color + c.value}
                className={`${c.value} ${c.hoverColor} w-10 h-10 rounded-full hover:border-2 hover:border-black`}
                onClick={() => handleColorChange(c.color)}
              ></Button>
            ))}
            <div className="w-10 h-10 relative hover:border-1 hover:border-black rounded-full">
              <input
                type="color"
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border-black opacity-0 absolute top-0 left-0 z-1"
              />
              <img
                src={colorPickerImage}
                className="w-full absolute top-0 left-0 -z-0"
              />
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button variant={"outline"} onClick={handleUploadClick}>
              Upload Image
            </Button>
            <Button variant={"outline"} onClick={handleAddUrl}>
              Add via URL
            </Button>
            <Button variant={"outline"} onClick={() => setShortcutsEnabled(!shortcutsEnabled)}>
              Shortcuts: {shortcutsEnabled ? "On" : "Off"}
            </Button>
          </div>
        </>
      </div>
    </div>
    {/* Inline edit overlay */}
    {inlineEdit.id && (
      <textarea
        autoFocus
        value={inlineEdit.value}
        onChange={(e) => setInlineEdit((s) => ({ ...s, value: e.target.value }))}
        onKeyDown={(e) => {
          if (e.key === "Enter") { e.preventDefault(); commitInlineEdit(); }
          if (e.key === "Escape") { e.preventDefault(); setInlineEdit({ id: null, value: "", x: 0, y: 0 }); }
        }}
        onBlur={() => commitInlineEdit()}
        style={{
          position: "fixed",
          left: inlineEdit.x,
          top: inlineEdit.y,
          transform: "translate(0, -2px)",
          padding: "4px 8px",
          fontSize: selectedShape?.fontSize || 24,
          fontFamily: selectedShape?.fontFamily || "Arial",
          color: selectedShape?.fill || "#000",
          background: "#ffffffcc",
          border: "1px solid #888",
          borderRadius: 4,
          zIndex: 50,
        }}
      />
    )}
    </>
  );
};

export default NewEditor;
