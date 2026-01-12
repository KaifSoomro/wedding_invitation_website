import React, { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Professional responsive editor layout with:
 * - Top toolbar (always visible)
 * - Left panel (tools - collapsible on desktop, drawer on mobile)
 * - Right panel (properties/layers - collapsible on desktop, drawer on mobile)
 * - Center canvas area (responsive scaling)
 */
export const EditorLayout = ({
  topToolbar,
  leftPanel,
  rightPanel,
  canvas,
  className = "",
}) => {
  const isMobile = useIsMobile();
  const [leftVisible, setLeftVisible] = useState(!isMobile);
  const [rightVisible, setRightVisible] = useState(!isMobile);

  if (isMobile) {
    return (
      <div className={`h-screen flex flex-col bg-neutral-100 ${className}`}>
        {/* Top Toolbar */}
        <div className="flex-none bg-white border-b shadow-sm">
          {topToolbar}
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-hidden relative">
          {canvas}
        </div>

        {/* Mobile Bottom Panels (Sheets) */}
        <div className="flex-none bg-white border-t p-2 flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                <Menu className="h-4 w-4 mr-2" />
                Tools
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
              <div className="h-full overflow-y-auto">
                {leftPanel}
              </div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                Properties
                <Menu className="h-4 w-4 ml-2" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] p-0">
              <div className="h-full overflow-y-auto">
                {rightPanel}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className={`h-screen flex flex-col bg-neutral-100 ${className}`}>
      {/* Top Toolbar */}
      <div className="flex-none bg-white border-b shadow-sm z-10">
        {topToolbar}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Tools */}
        <div
          className={`flex-none bg-white border-r shadow-sm transition-all duration-300 overflow-y-auto ${
            leftVisible ? "w-[280px]" : "w-0"
          }`}
        >
          {leftVisible && leftPanel}
        </div>

        {/* Left Toggle */}
        <div className="flex-none flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLeftVisible(!leftVisible)}
            className="h-12 w-6 rounded-none border-y"
          >
            {leftVisible ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-hidden relative">
          {canvas}
        </div>

        {/* Right Toggle */}
        <div className="flex-none flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setRightVisible(!rightVisible)}
            className="h-12 w-6 rounded-none border-y"
          >
            {rightVisible ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Right Panel - Properties/Layers */}
        <div
          className={`flex-none bg-white border-l shadow-sm transition-all duration-300 overflow-y-auto ${
            rightVisible ? "w-[320px]" : "w-0"
          }`}
        >
          {rightVisible && rightPanel}
        </div>
      </div>
    </div>
  );
};
