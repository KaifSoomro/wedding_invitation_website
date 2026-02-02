import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Image,
  Type,
  Square,
  Circle,
  Triangle,
  Star,
  Minus,
  ArrowRight,
  GripVertical,
} from "lucide-react";

const getShapeIcon = (type) => {
  const iconClass = "h-3 w-3";
  switch (type) {
    case "text":
      return <Type className={iconClass} />;
    case "image":
      return <Image className={iconClass} />;
    case "rect":
      return <Square className={iconClass} />;
    case "circle":
      return <Circle className={iconClass} />;
    case "triangle":
      return <Triangle className={iconClass} />;
    case "star":
      return <Star className={iconClass} />;
    case "line":
      return <Minus className={iconClass} />;
    case "arrow":
      return <ArrowRight className={iconClass} />;
    default:
      return <Square className={iconClass} />;
  }
};

const getShapeLabel = (shape) => {
  if (shape.type === "text") {
    return shape.text?.substring(0, 20) || "Text";
  }
  return shape.type.charAt(0).toUpperCase() + shape.type.slice(1);
};

export const LayersPanel = ({ shapes, selectedId, onSelectShape, onUpdateShape, onReorderLayers }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // Reverse array to show top layer first
  const layersReversed = [...shapes].reverse();

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    // Convert reversed indices back to original array indices
    const fromOriginalIndex = shapes.length - 1 - draggedIndex;
    const toOriginalIndex = shapes.length - 1 - dropIndex;

    // Reorder the shapes array
    const newShapes = [...shapes];
    const [movedShape] = newShapes.splice(fromOriginalIndex, 1);
    newShapes.splice(toOriginalIndex, 0, movedShape);

    if (onReorderLayers) {
      onReorderLayers(newShapes);
    }

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  if (shapes.length === 0) {
    return (
      <div className="p-4 text-center text-neutral-400 text-sm">
        <p>No layers yet</p>
        <p className="text-xs mt-1">Add elements to see them here</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-3">
        <h3 className="text-sm font-semibold mb-3 text-neutral-700">
          Layers ({shapes.length})
        </h3>
        <div className="space-y-1">
          {layersReversed.map((shape, idx) => {
            const isSelected = shape.id === selectedId;
            const layerNumber = shapes.length - idx;
            const isVisible = shape.visible !== false;
            const isLocked = shape.locked === true;

            return (
              <div
                key={shape.id}
                draggable={!isLocked}
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, idx)}
                onDragEnd={handleDragEnd}
                onClick={() => !isLocked && onSelectShape(shape.id)}
                className={`
                  flex items-center gap-2 p-2 rounded transition-colors
                  ${isSelected ? "bg-violet-100 border border-violet-300" : "bg-white border border-neutral-200 hover:bg-neutral-50"}
                  ${isLocked ? "opacity-60 cursor-not-allowed" : "cursor-move"}
                  ${draggedIndex === idx ? "opacity-50" : ""}
                  ${dragOverIndex === idx ? "border-t-2 border-t-violet-500" : ""}
                `}
              >
                {/* Drag handle */}
                {!isLocked && (
                  <div className="flex-shrink-0 text-neutral-400 cursor-move">
                    <GripVertical className="h-4 w-4" />
                  </div>
                )}
                
                {/* Layer indicator */}
                <div className="flex-shrink-0 w-6 h-6 rounded bg-neutral-100 flex items-center justify-center text-[10px] font-medium text-neutral-600">
                  {layerNumber}
                </div>

                {/* Shape icon */}
                <div className="flex-shrink-0 text-neutral-600">
                  {getShapeIcon(shape.type)}
                </div>

                {/* Shape label */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate text-neutral-700">
                    {getShapeLabel(shape)}
                  </p>
                  <p className="text-[10px] text-neutral-400">
                    {shape.type}
                  </p>
                </div>

                {/* Visibility toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateShape(shape.id, { visible: !isVisible });
                  }}
                >
                  {isVisible ? (
                    <Eye className="h-3 w-3 text-neutral-600" />
                  ) : (
                    <EyeOff className="h-3 w-3 text-neutral-400" />
                  )}
                </Button>

                {/* Lock toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateShape(shape.id, { locked: !isLocked });
                  }}
                >
                  {isLocked ? (
                    <Lock className="h-3 w-3 text-red-500" />
                  ) : (
                    <Unlock className="h-3 w-3 text-neutral-400" />
                  )}
                </Button>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-2 bg-neutral-50 rounded text-xs text-neutral-600">
          <p className="font-medium mb-1">Layer Tips:</p>
          <ul className="space-y-1 text-[11px]">
            <li>• Top = Front layer</li>
            <li>• Bottom = Back layer</li>
            <li>• Click to select</li>
            <li>• Drag to reorder layers</li>
            <li>• Use eye to hide/show</li>
            <li>• Use lock to prevent editing</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
