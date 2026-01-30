import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  MousePointer2,
  Type,
  Square,
  Circle,
  Image,
  Heart,
  Star,
  Triangle,
  Minus,
  MoveRight,
  Undo2,
  Redo2,
  Download,
  Upload,
  ZoomIn,
  ZoomOut,
  Maximize,
  Save,
  FolderOpen,
} from "lucide-react";
import { ShortcutsHelp } from "./ShortcutsHelp";

export const EditorToolbar = ({
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  zoomLevel = 100,
  onExport,
  onImport,
  onSelectMode,
  onAddText,
  onAddShape,
  onAddImage,
  onSaveDesign,
  onOpenMyDesigns,
  onSaveTemplate,
  onManageTemplates,
  currentTool = "select",
}) => {
  const tools = [
    { id: "select", icon: MousePointer2, label: "Select", action: onSelectMode },
    { id: "text", icon: Type, label: "Add Text (T)", action: onAddText },
    { id: "rect", icon: Square, label: "Rectangle (R)", action: () => onAddShape("rect") },
    { id: "circle", icon: Circle, label: "Circle (O)", action: () => onAddShape("circle") },
    { id: "triangle", icon: Triangle, label: "Triangle (P)", action: () => onAddShape("triangle") },
    { id: "star", icon: Star, label: "Star", action: () => onAddShape("star") },
    { id: "line", icon: Minus, label: "Line (L)", action: () => onAddShape("line") },
    { id: "arrow", icon: MoveRight, label: "Arrow (A)", action: () => onAddShape("arrow") },
    { id: "image", icon: Image, label: "Image", action: onAddImage },
  ];

  return (
    <div className="flex items-center justify-between h-14 px-4 gap-4">
      {/* Left: Logo/Title */}
      <div className="flex items-center gap-3">
        <Heart className="h-6 w-6 text-violet-600 fill-violet-600" />
        <span className="font-semibold text-lg hidden sm:inline">Wedding Card Editor</span>
      </div>

      {/* Center: Tools */}
      <TooltipProvider delayDuration={300}>
        <div className="flex items-center gap-1 bg-neutral-100 rounded-lg p-1">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Tooltip key={tool.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant={currentTool === tool.id ? "default" : "ghost"}
                    size="sm"
                    onClick={tool.action}
                    className="h-8 w-8 p-0"
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-xs">{tool.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>

      {/* Right: Actions */}
      <TooltipProvider delayDuration={300}>
        <div className="flex items-center gap-2">
          {/* Undo/Redo */}
          <div className="flex items-center gap-1 border-r pr-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onUndo}
                  disabled={!canUndo}
                  className="h-8 w-8 p-0"
                >
                  <Undo2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">Undo (Ctrl+Z)</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onRedo}
                  disabled={!canRedo}
                  className="h-8 w-8 p-0"
                >
                  <Redo2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">Redo (Ctrl+Y)</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Zoom */}
          <div className="hidden sm:flex items-center gap-1 border-r pr-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={onZoomOut} className="h-8 w-8 p-0">
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">Zoom Out</p>
              </TooltipContent>
            </Tooltip>

            <span className="text-xs font-medium min-w-[3rem] text-center">{Math.round(zoomLevel)}%</span>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={onZoomIn} className="h-8 w-8 p-0">
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">Zoom In</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={onZoomReset} className="h-8 w-8 p-0">
                  <Maximize className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">Reset Zoom</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Help */}
          <ShortcutsHelp />

          {/* Save & My Designs */}
          <div className="flex items-center gap-1 border-r pr-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSaveDesign}
                  className="h-8 w-8 p-0"
                >
                  <Save className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">Save Design</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onOpenMyDesigns}
                  className="h-8 w-8 p-0"
                >
                  <FolderOpen className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">My Designs</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Save & Manage Templates */}
          <div className="flex items-center gap-1 border-r pr-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSaveTemplate}
                  className="h-8 w-8 p-0"
                >
                  <Save className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">Save as Template</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onManageTemplates}
                  className="h-8 w-8 p-0"
                >
                  <FolderOpen className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">Manage Templates</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Help */}
          <ShortcutsHelp />

          {/* Export */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="default" size="sm" onClick={onExport} className="hidden sm:flex">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-xs">Export Design</p>
            </TooltipContent>
          </Tooltip>

          {/* Mobile Export */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="default" size="sm" onClick={onExport} className="sm:hidden h-8 w-8 p-0">
                <Download className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-xs">Export</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};
