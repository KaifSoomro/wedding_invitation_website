import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { designStorage } from "@/services/designStorage";

export const SaveDesignModal = ({
  open,
  onOpenChange,
  shapes,
  backgroundImage,
  onSaveSuccess,
}) => {
  const [designName, setDesignName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!designName.trim()) {
      setError("Please enter a design name");
      return;
    }

    try {
      setIsSaving(true);
      setError("");
      const saved = designStorage.saveDesign(designName, shapes, backgroundImage);
      setDesignName("");
      onOpenChange(false);
      if (onSaveSuccess) {
        onSaveSuccess(saved);
      }
    } catch (err) {
      setError("Failed to save design: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenChange = (newOpen) => {
    if (!newOpen) {
      setDesignName("");
      setError("");
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save Design</DialogTitle>
          <DialogDescription>
            Give your wedding card design a name to save it for later
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="design-name">Design Name</Label>
            <Input
              id="design-name"
              placeholder="e.g., Gold Wedding Invitation"
              value={designName}
              onChange={(e) => {
                setDesignName(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSave();
                }
              }}
              disabled={isSaving}
              autoFocus
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Design"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
