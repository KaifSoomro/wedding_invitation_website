import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { designStorage } from "@/services/designStorage";
import { Trash2, Upload, Download, Edit2 } from "lucide-react";

export const MyDesignsModal = ({
  open,
  onOpenChange,
  onLoadDesign,
}) => {
  const [designs, setDesigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      loadDesigns();
    }
  }, [open]);

  const loadDesigns = () => {
    try {
      const allDesigns = designStorage.getAllDesigns();
      setDesigns(allDesigns);
    } catch (error) {
      console.error("Error loading designs:", error);
    }
  };

  const handleDeleteDesign = (designId) => {
    if (window.confirm("Are you sure you want to delete this design?")) {
      try {
        designStorage.deleteDesign(designId);
        loadDesigns();
      } catch (error) {
        console.error("Error deleting design:", error);
      }
    }
  };

  const handleLoadDesign = (design) => {
    if (onLoadDesign) {
      onLoadDesign(design);
      onOpenChange(false);
    }
  };

  const handleExportDesigns = () => {
    try {
      designStorage.exportDesigns();
    } catch (error) {
      console.error("Error exporting designs:", error);
    }
  };

  const handleImportDesigns = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      designStorage
        .importDesigns(file)
        .then(() => {
          loadDesigns();
        })
        .catch((error) => {
          console.error("Error importing designs:", error);
        });
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Unknown";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>My Designs</DialogTitle>
          <DialogDescription>
            View, load, or manage your saved wedding card designs
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Import/Export Buttons */}
          <div className="flex gap-2 justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportDesigns}
                disabled={designs.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
              <div>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportDesigns}
                  className="hidden"
                  id="import-designs"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("import-designs").click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </div>
            </div>
          </div>

          {/* Designs List */}
          {designs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-500 mb-4">No saved designs yet</p>
              <p className="text-sm text-neutral-400">
                Create a design and save it to see it here
              </p>
            </div>
          ) : (
            <div className="grid gap-3">
              {designs.map((design) => (
                <div
                  key={design.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{design.name}</h3>
                    <p className="text-xs text-neutral-500">
                      Saved: {formatDate(design.updatedAt || design.createdAt)}
                    </p>
                    <p className="text-xs text-neutral-400">
                      {design.shapes?.length || 0} elements
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleLoadDesign(design)}
                      className="gap-2"
                    >
                      <Edit2 className="h-4 w-4" />
                      Load
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteDesign(design.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
