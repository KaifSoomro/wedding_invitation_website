import React, { useEffect, useRef, useState } from "react";
import {
  Stage,
  Layer,
  Text,
  Transformer,
  Image as KonvaImage,
} from "react-konva";
import { useParams } from "react-router-dom";
import { templates } from "@/TemplateData";
import useImage from "use-image";
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

const NewEditor = () => {
  const { id } = useParams();
  const [shapes, setShapes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [bgUrl, setBgUrl] = useState(null);
  const shapeRefs = useRef({});
  const stageRef = useRef();
  const trRef = useRef();
  const originalFontSize = useRef(null);

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

  const STAGE_WIDTH = 620;
  const STAGE_HEIGHT = 750;

  useEffect(() => {
    const template = templates.find((t) => t.id === Number(id));
    if (template) {
      setShapes(template.shapes);
      setBgUrl(template.backgroundImage);
    }
  }, [id]);

  const [backgroundImage] = useImage(bgUrl, "anonymous");

  useEffect(() => {
    if (trRef.current) {
      if (selectedId && shapeRefs.current[selectedId]) {
        trRef.current.nodes([shapeRefs.current[selectedId]]);
      } else {
        trRef.current.nodes([]);
      }
      trRef.current.getLayer().batchDraw();
    }
  }, [selectedId]);

  const handleTextChange = (text) => {
    setShapes((prevShapes) =>
      prevShapes.map((shape) =>
        shape.id === selectedId ? { ...shape, text } : shape
      )
    );
  };

  const handleColorChange = (color) => {
    setShapes((prevShapes) =>
      prevShapes.map((shape) =>
        shape.id === selectedId ? { ...shape, fill: color } : shape
      )
    );
  };

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

  const renderShape = (shape, i) => {
    const commonProps = {
      key: shape.id,
      ref: (node) => (shapeRefs.current[shape.id] = node),
      draggable: true,
      onClick: (e) => {
        e.cancelBubble = true;
        setSelectedId(shape.id);
      },
      onTap: (e) => {
        e.cancelBubble = true;
        setSelectedId(shape.id);
      },
      onDragMove: (e) => {
        const x = e.target.x();
        const y = e.target.y();
        console.log(`Text ID ${shape.id} → x: ${x}, y: ${y}`);
      },
      onDragEnd: (e) => {
        const updated = {
          ...shape,
          x: e.target.x(),
          y: e.target.y(),
        };
        const newShapes = [...shapes];
        newShapes[i] = updated;
        setShapes(newShapes);
        console.log(updated);
      },
    };

    switch (shape.type) {
      case "text":
        return (
          <Text
            {...commonProps}
            x={shape.x}
            y={shape.y}
            text={shape.text}
            fontSize={shape.fontSize}
            fill={shape.fill}
            fontStyle={shape.isItalic ? "italic" : "normal"}
            fontWeight={shape.isBold ? "bold" : "normal"}
            align={shape.textAlign || "center"}
            fontFamily={shape.fontFamily || "Arial"}
            onTransformStart={() => {
              originalFontSize.current = shape.fontSize;
            }}
            onTransformEnd={() => {
              const node = shapeRefs.current[shape.id];
              const newFontSize = originalFontSize.current * node.scaleY();
              node.scaleX(1);
              node.scaleY(1);

              const updated = {
                ...shape,
                x: node.x(),
                y: node.y(),
                fontSize: newFontSize,
              };

              const newShapes = [...shapes];
              newShapes[i] = updated;
              setShapes(newShapes);
            }}
          />
        );
      default:
        return null;
    }
  };

  const handleAddText = () => {
    const newId = Date.now();
    const newTextShape = {
      id: newId,
      type: "text",
      text: "New Text",
      x: 50,
      y: 50,
      fontSize: 24,
      fill: "black",
      fontFamily: "Arial",
      textAlign: "center",
      isBold: false,
      isItalic: false,
    };

    setShapes((prevShapes) => [...prevShapes, newTextShape]);
    setSelectedId(newId);
  };

  const handleDeleteText = () => {
    if (!selectedId) return;

    setShapes((prevShapes) =>
      prevShapes.filter((shape) => shape.id !== selectedId)
    );
    setSelectedId(null);

    if (trRef.current) {
      trRef.current.nodes([]);
      trRef.current.getLayer().batchDraw();
    }
  };

  const selectedShape = shapes?.find((shape) => shape?.id === selectedId);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-neutral-200">
      {/* Canvas Section */}
      <div
        className="bg-white shadow-md mt-20 overflow-hidden"
        style={{ width: STAGE_WIDTH, height: STAGE_HEIGHT }}
      >
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
          ref={stageRef}
          onMouseDown={(e) => {
            if (e.target === e.target.getStage()) setSelectedId(null);
          }}
        >
          <Layer>
            {/* Background Image */}
            {backgroundImage && (
              <KonvaImage
                image={backgroundImage}
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
            <Transformer ref={trRef} />
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

            <Button onClick={handleAddText} variant={"outline"}>
              <CiText />
            </Button>

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
          </div>

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
        </>
      </div>
    </div>
  );
};

export default NewEditor;
