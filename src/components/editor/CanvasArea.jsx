import React, { useCallback, useEffect, useRef, useState } from "react";
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
import useImage from "use-image";
import { useTouchGestures } from "@/hooks/useTouchGestures";

const KImg = ({ src, onError, ...rest }) => {
  const [img, status] = useImage(src, "anonymous");
  
  // Call onError callback if image fails to load
  React.useEffect(() => {
    if (status === "failed" && onError) {
      onError();
    }
  }, [status, onError]);

  // Only render if image loaded successfully
  if (status === "loading" || status === "failed") {
    return null;
  }
  
  return <KonvaImage image={img} {...rest} />;
};

export const CanvasArea = ({
  shapes,
  setShapes,
  selectedId,
  setSelectedId,
  backgroundImage,
  stageRef,
  trRef,
  stageState,
  setStageState,
  handleWheel,
  width,
  height,
  placingTool,
  setPlacingTool,
}) => {
  const [inlineEdit, setInlineEdit] = useState({ id: null, value: "", x: 0, y: 0 });

  // Enable touch gestures for mobile
  useTouchGestures(stageRef, setStageState);

  const commitInlineEdit = useCallback(() => {
    if (!inlineEdit.id) return;
    setShapes((prev) =>
      prev.map((s) => (s.id === inlineEdit.id ? { ...s, text: inlineEdit.value } : s))
    );
    setInlineEdit({ id: null, value: "", x: 0, y: 0 });
  }, [inlineEdit, setShapes]);

  const renderShape = useCallback(
    (shape, i) => {
      // Skip invisible shapes
      if (shape.visible === false) return null;

      const isLocked = shape.locked === true;

      const common = {
        key: shape.id,
        id: `node-${shape.id}`,
        draggable: !isLocked,
        onClick: (e) => {
          if (isLocked) return;
          e.cancelBubble = true;
          setSelectedId(shape.id);
        },
        onTap: (e) => {
          if (isLocked) return;
          e.cancelBubble = true;
          setSelectedId(shape.id);
        },
        onDragStart: (e) => {
          if (isLocked) {
            e.cancelBubble = true;
            e.target.stopDrag();
            return;
          }
          e.cancelBubble = true;
        },
        onDragMove: (e) => {
          if (isLocked) return;
          e.cancelBubble = true;
        },
        onDragEnd: (e) => {
          if (isLocked) return;
          e.cancelBubble = true;
          const node = e.target;
          // Constrain to canvas bounds
          const x = Math.max(0, Math.min(node.x(), width));
          const y = Math.max(0, Math.min(node.y(), height));
          const updated = { ...shape, x, y, rotation: node.rotation() };
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
                if (isLocked) return;
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
                if (isLocked) return;
                const node = e.target;
                const newFontSize = (shape.fontSize || 24) * node.scaleY();
                node.scaleX(1);
                node.scaleY(1);
                const updated = {
                  ...shape,
                  x: node.x(),
                  y: node.y(),
                  fontSize: newFontSize,
                  rotation: node.rotation(),
                };
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
              opacity={shape.opacity ?? 1}
              rotation={shape.rotation || 0}
              onTransformEnd={(e) => {
                const node = e.target;
                const updated = {
                  ...shape,
                  x: node.x(),
                  y: node.y(),
                  width: Math.max(5, shape.width * node.scaleX()),
                  height: Math.max(5, shape.height * node.scaleY()),
                  rotation: node.rotation(),
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
              opacity={shape.opacity ?? 1}
              rotation={shape.rotation || 0}
              onTransformEnd={(e) => {
                const node = e.target;
                const updated = {
                  ...shape,
                  x: node.x(),
                  y: node.y(),
                  radius: Math.max(3, shape.radius * node.scaleX()),
                  rotation: node.rotation(),
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
              opacity={shape.opacity ?? 1}
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
              opacity={shape.opacity ?? 1}
            />
          );
        }
        case "image": {
          // Show placeholder if imageSrc is missing
          if (!shape.imageSrc) {
            return (
              <Rect
                {...common}
                x={shape.x}
                y={shape.y}
                width={shape.width || 100}
                height={shape.height || 100}
                fill="#e5e7eb"
                stroke="#9ca3af"
                strokeWidth={2}
                opacity={shape.opacity ?? 1}
                rotation={shape.rotation || 0}
                cornerRadius={4}
                onTransformEnd={(e) => {
                  if (isLocked) return;
                  const node = e.target;
                  const updated = {
                    ...shape,
                    x: node.x(),
                    y: node.y(),
                    width: Math.max(5, (shape.width || 100) * node.scaleX()),
                    height: Math.max(5, (shape.height || 100) * node.scaleY()),
                    rotation: node.rotation(),
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

          return (
            <KImg
              {...common}
              x={shape.x}
              y={shape.y}
              width={shape.width}
              height={shape.height}
              src={shape.imageSrc}
              opacity={shape.opacity ?? 1}
              rotation={shape.rotation || 0}
              listening={true}
              onError={() => {
                console.warn("Failed to load image:", shape.imageSrc);
              }}
              onTransformEnd={(e) => {
                if (isLocked) return;
                const node = e.target;
                const updated = {
                  ...shape,
                  x: node.x(),
                  y: node.y(),
                  width: Math.max(5, shape.width * node.scaleX()),
                  height: Math.max(5, shape.height * node.scaleY()),
                  rotation: node.rotation(),
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
              opacity={shape.opacity ?? 1}
              rotation={shape.rotation || 0}
              onTransformEnd={(e) => {
                const node = e.target;
                const updated = {
                  ...shape,
                  x: node.x(),
                  y: node.y(),
                  radius: Math.max(3, (shape.radius || 40) * node.scaleX()),
                  rotation: node.rotation(),
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
              opacity={shape.opacity ?? 1}
              rotation={shape.rotation || 0}
              onTransformEnd={(e) => {
                const node = e.target;
                const updated = {
                  ...shape,
                  x: node.x(),
                  y: node.y(),
                  innerRadius: Math.max(2, (shape.innerRadius || 20) * node.scaleX()),
                  outerRadius: Math.max(3, (shape.outerRadius || 40) * node.scaleY()),
                  rotation: node.rotation(),
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
    [setSelectedId, shapes, setShapes, width, height, stageRef, trRef]
  );

  const selectedShape = shapes.find((s) => s.id === selectedId);

  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-100 overflow-hidden relative">
      {/* Placing hint */}
      {placingTool && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-violet-600 text-white text-sm rounded-md px-3 py-1.5 shadow-lg z-10 pointer-events-none">
          Click on canvas to place {placingTool}
        </div>
      )}

      {/* Canvas */}
      <div className="bg-white shadow-xl" style={{ width, height }}>
        <Stage
          width={width}
          height={height}
          scaleX={stageState.scale}
          scaleY={stageState.scale}
          x={stageState.x}
          y={stageState.y}
          draggable={false}
          ref={stageRef}
          onWheel={handleWheel}
          onMouseDown={(e) => {
            const stage = e.target.getStage();
            const clickedOnEmpty = e.target === stage;

            // If placing tool is active, allow clicking anywhere (on shapes or empty space)
            if (placingTool) {
              const pointer = stage.getPointerPosition();
              const scale = stage.scaleX() || 1;
              const x = (pointer.x - stage.x()) / scale;
              const y = (pointer.y - stage.y()) / scale;
              setPlacingTool(null); // consumed
              // trigger parent to actually add the shape at this position
              const event = new CustomEvent("placeShape", { detail: { x, y } });
              window.dispatchEvent(event);
              e.cancelBubble = true; // Stop event propagation
              return;
            }

            if (clickedOnEmpty) setSelectedId(null);
          }}
        >
          {/* Background Layer - Always at bottom, never interactive */}
          <Layer listening={false}>
            {backgroundImage && (
              <KonvaImage
                key="background-image"
                image={backgroundImage}
                x={0}
                y={0}
                width={width}
                height={height}
                listening={false}
                draggable={false}
                perfectDrawEnabled={false}
                shadowForStrokeEnabled={false}
                hitStrokeWidth={0}
              />
            )}
          </Layer>

          {/* Content Layer - Interactive shapes */}
          <Layer>
            {/* Shapes */}
            {shapes.map((shape, i) => renderShape(shape, i))}

            {/* Transformer */}
            <Transformer
              ref={trRef}
              rotateEnabled={true}
              enabledAnchors={[
                "top-left",
                "top-right",
                "bottom-left",
                "bottom-right",
              ]}
              boundBoxFunc={(oldBox, newBox) => {
                // Prevent negative scaling
                if (newBox.width < 5 || newBox.height < 5) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          </Layer>
        </Stage>
      </div>

      {/* Inline text editor */}
      {inlineEdit.id && (
        <textarea
          autoFocus
          value={inlineEdit.value}
          onChange={(e) =>
            setInlineEdit((s) => ({ ...s, value: e.target.value }))
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              commitInlineEdit();
            } else if (e.key === "Escape") {
              e.preventDefault();
              setInlineEdit({ id: null, value: "", x: 0, y: 0 });
            }
          }}
          onBlur={commitInlineEdit}
          style={{
            position: "fixed",
            left: inlineEdit.x,
            top: inlineEdit.y,
            minWidth: 180,
            padding: "4px 8px",
            fontSize: selectedShape?.fontSize || 24,
            fontFamily: selectedShape?.fontFamily || "Arial",
            color: selectedShape?.fill || "#000",
            background: "#ffffffcc",
            border: "1px solid #888",
            borderRadius: 4,
            zIndex: 50,
            resize: "none",
          }}
        />
      )}
    </div>
  );
};
