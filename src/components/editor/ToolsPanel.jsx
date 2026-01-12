import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shapes,
  Image as ImageIcon,
  Heart,
  Upload,
  Search,
} from "lucide-react";

const sampleShapes = [
  { id: "rect", type: "rect", label: "Rectangle", icon: "▭" },
  { id: "circle", type: "circle", label: "Circle", icon: "●" },
  { id: "triangle", type: "triangle", label: "Triangle", icon: "▲" },
  { id: "star", type: "star", label: "Star", icon: "★" },
];

const sampleStickers = [
  { id: "heart", emoji: "❤️", label: "Heart" },
  { id: "ring", emoji: "💍", label: "Ring" },
  { id: "flower", emoji: "💐", label: "Flower" },
  { id: "cake", emoji: "🎂", label: "Cake" },
  { id: "champagne", emoji: "🍾", label: "Champagne" },
  { id: "balloon", emoji: "🎈", label: "Balloon" },
  { id: "gift", emoji: "🎁", label: "Gift" },
  { id: "sparkle", emoji: "✨", label: "Sparkle" },
  { id: "dove", emoji: "🕊️", label: "Dove" },
  { id: "church", emoji: "💒", label: "Church" },
  { id: "bride", emoji: "👰", label: "Bride" },
  { id: "groom", emoji: "🤵", label: "Groom" },
  { id: "couple", emoji: "👩‍❤️‍👨", label: "Couple" },
  { id: "camera", emoji: "📸", label: "Camera" },
  { id: "music", emoji: "🎵", label: "Music" },
];

export const ToolsPanel = ({ onAddShape, onAddImage, onAddSticker }) => {
  const [search, setSearch] = useState("");

  const filteredStickers = sampleStickers.filter((s) =>
    s.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-lg">Elements</h3>
      </div>

      <Tabs defaultValue="shapes" className="flex-1 flex flex-col">
        <TabsList className="w-full rounded-none border-b">
          <TabsTrigger value="shapes" className="flex-1">
            <Shapes className="h-4 w-4 mr-2" />
            Shapes
          </TabsTrigger>
          <TabsTrigger value="stickers" className="flex-1">
            <Heart className="h-4 w-4 mr-2" />
            Stickers
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="shapes" className="p-4 mt-0 space-y-3">
            <p className="text-xs text-neutral-500 mb-3">Click to add shape to canvas</p>
            <div className="grid grid-cols-2 gap-2">
              {sampleShapes.map((shape) => (
                <Button
                  key={shape.id}
                  variant="outline"
                  className="h-20 flex flex-col gap-2"
                  onClick={() => onAddShape(shape.type)}
                >
                  <span className="text-3xl">{shape.icon}</span>
                  <span className="text-xs">{shape.label}</span>
                </Button>
              ))}
            </div>

            <div className="pt-4 border-t">
              <Button
                variant="outline"
                className="w-full"
                onClick={onAddImage}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="stickers" className="p-4 mt-0 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input
                placeholder="Search stickers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {filteredStickers.map((sticker) => (
                <Button
                  key={sticker.id}
                  variant="ghost"
                  className="h-14 text-3xl p-0 hover:bg-violet-50"
                  onClick={() => onAddSticker(sticker.emoji)}
                  title={sticker.label}
                >
                  {sticker.emoji}
                </Button>
              ))}
            </div>

            {filteredStickers.length === 0 && (
              <div className="text-center py-8 text-sm text-neutral-400">
                No stickers found
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
