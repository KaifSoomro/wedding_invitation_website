import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Text, Image as KonvaImage, Rect, Circle, Line, Arrow, RegularPolygon, Star } from "react-konva";
import useImage from "use-image";

// Component to render Konva Image
const KImg = ({ src, width, height }) => {
  const [img] = useImage(src, "anonymous");
  return <KonvaImage image={img} width={width} height={height} />;
};

const Card = ({ values }) => {
  // Fallback to backgroundImage if thumbnail is not available
  const imageUrl = values.backgroundImage;
  const shapes = values.shapes || [];
  
  // Card and canvas dimensions
  const CARD_WIDTH = 300;
  const CARD_HEIGHT = 350;
  const CANVAS_WIDTH = 620;
  const CANVAS_HEIGHT = 750;
  
  // Calculate scale to fit canvas in card
  const scale = Math.min(CARD_WIDTH / CANVAS_WIDTH, CARD_HEIGHT / CANVAS_HEIGHT);
  
  // Get theme badge color
  const getThemeBadgeColor = (theme) => {
    const themeColors = {
      romantic: "bg-pink-500",
      elegant: "bg-purple-500",
      minimalist: "bg-gray-500",
      modern: "bg-blue-500",
      vintage: "bg-amber-500",
      ai: "bg-indigo-500",
      custom: "bg-violet-600",
    };
    return themeColors[theme] || "bg-violet-600";
  };
  
  // Render shape based on type
  const renderShape = (shape) => {
    const common = {
      key: shape.id,
      id: `shape-${shape.id}`,
      listening: false, // Non-interactive
    };

    switch (shape.type) {
      case "text":
        return (
          <Text
            {...common}
            x={shape.x}
            y={shape.y}
            text={shape.text}
            fontSize={shape.fontSize}
            fontFamily={shape.fontFamily}
            fill={shape.fill}
            align={shape.textAlign || "left"}
            fontStyle={`${shape.isBold ? "bold" : ""} ${shape.isItalic ? "italic" : ""}`.trim()}
          />
        );

      case "rect":
        return (
          <Rect
            {...common}
            x={shape.x}
            y={shape.y}
            width={shape.width}
            height={shape.height}
            fill={shape.fill}
            stroke={shape.stroke}
            strokeWidth={shape.strokeWidth}
            cornerRadius={shape.cornerRadius || 0}
          />
        );

      case "circle":
        return (
          <Circle
            {...common}
            x={shape.x}
            y={shape.y}
            radius={shape.radius}
            fill={shape.fill}
            stroke={shape.stroke}
            strokeWidth={shape.strokeWidth}
          />
        );

      case "line":
        return (
          <Line
            {...common}
            points={shape.points}
            stroke={shape.stroke}
            strokeWidth={shape.strokeWidth}
          />
        );

      case "arrow":
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

      case "triangle":
        return (
          <RegularPolygon
            {...common}
            x={shape.x}
            y={shape.y}
            sides={3}
            radius={shape.radius}
            fill={shape.fill}
            stroke={shape.stroke}
            strokeWidth={shape.strokeWidth}
          />
        );

      case "star":
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
          />
        );

      case "image":
        return (
          <KonvaImage
            {...common}
            x={shape.x}
            y={shape.y}
            width={shape.width}
            height={shape.height}
            image={shape.image}
          />
        );

      default:
        return null;
    }
  };
  
  return (
    <div className="w-[300px] h-[350px] border-2 rounded hover:border-gray-600 hover:shadow-lg transition-all duration-300 relative overflow-hidden group bg-white">
      {/* Render full design with Konva */}
      <Stage
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        scaleX={scale}
        scaleY={scale}
        className="rounded"
      >
        <Layer>
          {/* Background Image */}
          {imageUrl && (
            <KImg
              src={imageUrl}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
            />
          )}
          
          {/* Render all shapes */}
          {shapes.map((shape) => renderShape(shape))}
        </Layer>
      </Stage>
      
      {/* Fallback for no content */}
      {!imageUrl && shapes.length === 0 && (
        <div className="absolute inset-0 rounded bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <p className="text-lg font-semibold">{values.name}</p>
            <p className="text-sm mt-2">No preview available</p>
          </div>
        </div>
      )}
      
      {/* Template info overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-sm font-semibold truncate">{values.name}</p>
        <div className="flex gap-2 mt-1 text-xs">
          {values.orientation && (
            <span className="bg-white/20 px-2 py-0.5 rounded">
              {values.orientation}
            </span>
          )}
          {values.price && (
            <span className="bg-white/20 px-2 py-0.5 rounded capitalize">
              {values.price}
            </span>
          )}
        </div>
      </div>
      
      {/* Theme/Category badge */}
      {(values.theme || values.categorie === "custom") && (
        <div className={`absolute top-2 right-2 ${getThemeBadgeColor(values.theme)} text-white text-xs px-2 py-1 rounded-full shadow-md capitalize`}>
          {values.categorie === "custom" ? "Custom" : values.theme}
        </div>
      )}
    </div>
  );
};

export default Card;
