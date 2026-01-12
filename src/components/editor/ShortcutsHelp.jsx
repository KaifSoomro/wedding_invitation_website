import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Keyboard } from "lucide-react";

const shortcuts = [
  { category: "Tools", items: [
    { keys: "T", desc: "Add Text" },
    { keys: "R", desc: "Add Rectangle" },
    { keys: "O", desc: "Add Circle" },
    { keys: "P", desc: "Add Triangle" },
    { keys: "S", desc: "Add Star" },
    { keys: "L", desc: "Add Line" },
    { keys: "A", desc: "Add Arrow" },
    { keys: "I", desc: "Import Image" },
  ]},
  { category: "Editing", items: [
    { keys: "Ctrl/Cmd + Z", desc: "Undo" },
    { keys: "Ctrl/Cmd + Y", desc: "Redo" },
    { keys: "Delete/Backspace", desc: "Delete Selected" },
    { keys: "Ctrl/Cmd + N", desc: "New/Clear Canvas" },
    { keys: "Space + Drag", desc: "Pan Canvas" },
  ]},
  { category: "Navigation", items: [
    { keys: "Mouse Wheel", desc: "Zoom In/Out" },
    { keys: "Double Click", desc: "Edit Text" },
    { keys: "Drag", desc: "Move Element" },
  ]},
];

export const ShortcutsHelp = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" title="Keyboard Shortcuts">
          <Keyboard className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Speed up your workflow with these keyboard shortcuts
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {shortcuts.map((section) => (
            <div key={section.category}>
              <h3 className="font-semibold mb-3 text-sm text-neutral-600 uppercase tracking-wide">
                {section.category}
              </h3>
              <div className="space-y-2">
                {section.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1.5">
                    <span className="text-sm">{item.desc}</span>
                    <kbd className="px-2 py-1 text-xs font-mono bg-neutral-100 border border-neutral-300 rounded">
                      {item.keys}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
