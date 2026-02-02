import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  ChevronsUp,
  ChevronsDown,
  ImageIcon,
  RefreshCw,
} from "lucide-react";

export const PropertiesPanel = ({ selectedShape, onUpdate, onDelete, onDuplicate, onLayerAction, onReplaceImage }) => {
  const fileInputRef = useRef(null);
  if (!selectedShape) {
    return (
      <div className="p-6 h-full flex items-center justify-center text-center">
        <div className="text-neutral-400">
          <p className="text-sm">No element selected</p>
          <p className="text-xs mt-1">Select an element to edit properties</p>
        </div>
      </div>
    );
  }

  const { type } = selectedShape;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onReplaceImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onReplaceImage(selectedShape.id, event.target.result);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = ""; // Reset input
  };

  return (
    <div className="h-full overflow-y-auto">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold capitalize">{type} Properties</h3>
          <Button variant="ghost" size="sm" onClick={onDelete} className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <Separator />

        {/* Layer Management - Enhanced */}
        <div>
          <label className="text-xs font-medium mb-2 block">Layer Order</label>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onLayerAction?.("front")} 
              className="w-full"
              title="Bring to front"
            >
              <ChevronsUp className="h-3 w-3 mr-1" />
              To Front
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onLayerAction?.("back")} 
              className="w-full"
              title="Send to back"
            >
              <ChevronsDown className="h-3 w-3 mr-1" />
              To Back
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onLayerAction?.("forward")} 
              className="w-full"
              title="Move forward"
            >
              <ArrowUp className="h-3 w-3 mr-1" />
              Forward
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onLayerAction?.("backward")} 
              className="w-full"
              title="Move backward"
            >
              <ArrowDown className="h-3 w-3 mr-1" />
              Backward
            </Button>
          </div>
        </div>

        <Separator />

        {/* Common Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" onClick={onDuplicate} className="w-full">
            <Copy className="h-3 w-3 mr-1" />
            Duplicate
          </Button>
          <Button variant="outline" size="sm" onClick={onDelete} className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
        </div>

        <Separator />

        {/* Image Replacement */}
        {type === "image" && (
          <>
            <div className="space-y-3">
              <label className="text-xs font-medium block">Image Source</label>
              
              {/* Image Preview */}
              {selectedShape.imageSrc && (
                <div className="relative w-full h-32 bg-neutral-100 rounded border overflow-hidden">
                  <img 
                    src={selectedShape.imageSrc} 
                    alt="Selected" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div 
                    className="absolute inset-0 flex items-center justify-center text-neutral-400 text-xs"
                    style={{ display: 'none' }}
                  >
                    <div className="text-center">
                      <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                      <p>Failed to load</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Show current image info */}
              {selectedShape.imageSrc && (
                <div className="p-2 bg-neutral-50 rounded text-xs break-all">
                  <p className="text-neutral-600 mb-1">Source:</p>
                  <p className="text-neutral-800 font-mono text-[10px]">
                    {selectedShape.imageSrc.substring(0, 80)}
                    {selectedShape.imageSrc.length > 80 ? "..." : ""}
                  </p>
                </div>
              )}
              
              {!selectedShape.imageSrc && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                  ⚠️ No image source set. Please upload or enter URL.
                </div>
              )}
              
              {/* Replace from file */}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => fileInputRef.current?.click()} 
                className="w-full"
              >
                <RefreshCw className="h-3 w-3 mr-2" />
                Replace Image (Upload)
              </Button>
              
              {/* Update from URL */}
              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-xs">Or enter image URL:</Label>
                <div className="flex gap-2">
                  <Input
                    id="imageUrl"
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    defaultValue={selectedShape.imageSrc?.startsWith('http') ? selectedShape.imageSrc : ''}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const url = e.target.value.trim();
                        if (url && onReplaceImage) {
                          onReplaceImage(selectedShape.id, url);
                        }
                      }
                    }}
                    className="flex-1 text-xs"
                  />
                  <Button 
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      const input = e.target.closest('.flex').querySelector('input');
                      const url = input?.value.trim();
                      if (url && onReplaceImage) {
                        onReplaceImage(selectedShape.id, url);
                      }
                    }}
                  >
                    Set
                  </Button>
                </div>
              </div>
              
              <p className="text-xs text-neutral-500">
                💡 Position, size and rotation will be preserved
              </p>
            </div>
            <Separator />
          </>
        )}

        {/* Text Properties */}
        {type === "text" && (
          <>
            <div>
              <label className="text-xs font-medium mb-2 block">Text Content</label>
              <textarea
                value={selectedShape.text || ""}
                onChange={(e) => onUpdate({ text: e.target.value })}
                className="w-full p-2 border rounded-md text-sm resize-none"
                rows={3}
                placeholder="Enter text..."
              />
            </div>

            <div>
              <label className="text-xs font-medium mb-2 block">Font Family</label>
              <Select
                value={selectedShape.fontFamily || "Arial"}
                onValueChange={(v) => onUpdate({ fontFamily: v })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Arial">Arial</SelectItem>
                  <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                  <SelectItem value="Georgia">Georgia</SelectItem>
                  <SelectItem value="Courier New">Courier New</SelectItem>
                  <SelectItem value="Verdana">Verdana</SelectItem>
                  <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                  <SelectItem value="Cormorant Garamond">Cormorant Garamond</SelectItem>
                  <SelectItem value="Great Vibes">Great Vibes</SelectItem>
                  <SelectItem value="Dancing Script">Dancing Script</SelectItem>
                  <SelectItem value="Montserrat">Montserrat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium mb-2 block">Font Size: {selectedShape.fontSize || 24}px</label>
              <Slider
                value={[selectedShape.fontSize || 24]}
                onValueChange={([v]) => onUpdate({ fontSize: v })}
                min={8}
                max={200}
                step={1}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={selectedShape.textAlign === "left" ? "default" : "outline"}
                size="sm"
                onClick={() => onUpdate({ textAlign: "left" })}
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                variant={selectedShape.textAlign === "center" ? "default" : "outline"}
                size="sm"
                onClick={() => onUpdate({ textAlign: "center" })}
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button
                variant={selectedShape.textAlign === "right" ? "default" : "outline"}
                size="sm"
                onClick={() => onUpdate({ textAlign: "right" })}
              >
                <AlignRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={selectedShape.isBold ? "default" : "outline"}
                size="sm"
                onClick={() => onUpdate({ isBold: !selectedShape.isBold })}
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant={selectedShape.isItalic ? "default" : "outline"}
                size="sm"
                onClick={() => onUpdate({ isItalic: !selectedShape.isItalic })}
              >
                <Italic className="h-4 w-4" />
              </Button>
            </div>

            <div>
              <label className="text-xs font-medium mb-2 block">Letter Spacing: {selectedShape.letterSpacing ?? 0}</label>
              <Input
                type="number"
                value={selectedShape.letterSpacing ?? 0}
                onChange={(e) => onUpdate({ letterSpacing: parseFloat(e.target.value) })}
                step={0.1}
              />
            </div>

            <div>
              <label className="text-xs font-medium mb-2 block">Line Height: {selectedShape.lineHeight ?? 1.2}</label>
              <Input
                type="number"
                value={selectedShape.lineHeight ?? 1.2}
                onChange={(e) => onUpdate({ lineHeight: parseFloat(e.target.value) })}
                step={0.1}
                min={0.5}
                max={3}
              />
            </div>
          </>
        )}

        {/* Fill Color */}
        {(type === "text" || type === "rect" || type === "circle" || type === "triangle" || type === "star") && (
          <div>
            <label className="text-xs font-medium mb-2 block">Fill Color</label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={selectedShape.fill || "#000000"}
                onChange={(e) => onUpdate({ fill: e.target.value })}
                className="w-16 h-10 p-1"
              />
              <Input
                type="text"
                value={selectedShape.fill || "#000000"}
                onChange={(e) => onUpdate({ fill: e.target.value })}
                className="flex-1"
                placeholder="#000000"
              />
            </div>
          </div>
        )}

        {/* Stroke */}
        {(type !== "image") && (
          <>
            <div>
              <label className="text-xs font-medium mb-2 block">Stroke Color</label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={selectedShape.stroke || "#000000"}
                  onChange={(e) => onUpdate({ stroke: e.target.value })}
                  className="w-16 h-10 p-1"
                />
                <Input
                  type="text"
                  value={selectedShape.stroke || "#000000"}
                  onChange={(e) => onUpdate({ stroke: e.target.value })}
                  className="flex-1"
                  placeholder="#000000"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium mb-2 block">Stroke Width: {selectedShape.strokeWidth ?? 1}px</label>
              <Slider
                value={[selectedShape.strokeWidth ?? 1]}
                onValueChange={([v]) => onUpdate({ strokeWidth: v })}
                min={0}
                max={20}
                step={1}
                className="w-full"
              />
            </div>
          </>
        )}

        {/* Opacity */}
        <div>
          <label className="text-xs font-medium mb-2 block">Opacity: {Math.round((selectedShape.opacity ?? 1) * 100)}%</label>
          <Slider
            value={[selectedShape.opacity ?? 1]}
            onValueChange={([v]) => onUpdate({ opacity: v })}
            min={0}
            max={1}
            step={0.01}
            className="w-full"
          />
        </div>

        {/* Size (for images and shapes) */}
        {(type === "image" || type === "rect") && (
          <>
            <Separator />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-medium mb-1 block">Width</label>
                <Input
                  type="number"
                  value={Math.round(selectedShape.width || 0)}
                  onChange={(e) => onUpdate({ width: parseFloat(e.target.value) })}
                  min={5}
                />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Height</label>
                <Input
                  type="number"
                  value={Math.round(selectedShape.height || 0)}
                  onChange={(e) => onUpdate({ height: parseFloat(e.target.value) })}
                  min={5}
                />
              </div>
            </div>
          </>
        )}

        {/* Radius (for circles) */}
        {type === "circle" && (
          <>
            <Separator />
            <div>
              <label className="text-xs font-medium mb-2 block">Radius: {Math.round(selectedShape.radius || 0)}px</label>
              <Slider
                value={[selectedShape.radius || 50]}
                onValueChange={([v]) => onUpdate({ radius: v })}
                min={5}
                max={300}
                step={1}
                className="w-full"
              />
            </div>
          </>
        )}

        {/* Position */}
        <Separator />
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs font-medium mb-1 block">X</label>
            <Input
              type="number"
              value={Math.round(selectedShape.x || 0)}
              onChange={(e) => onUpdate({ x: parseFloat(e.target.value) })}
            />
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block">Y</label>
            <Input
              type="number"
              value={Math.round(selectedShape.y || 0)}
              onChange={(e) => onUpdate({ y: parseFloat(e.target.value) })}
            />
          </div>
        </div>

        {/* Rotation */}
        <div>
          <label className="text-xs font-medium mb-2 block">Rotation: {Math.round(selectedShape.rotation || 0)}°</label>
          <Slider
            value={[selectedShape.rotation || 0]}
            onValueChange={([v]) => onUpdate({ rotation: v })}
            min={0}
            max={360}
            step={1}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};
