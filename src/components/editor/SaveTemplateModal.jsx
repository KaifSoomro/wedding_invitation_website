import React, { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { templateStorage } from "@/services/templateStorage";

export const SaveTemplateModal = ({
  open,
  onOpenChange,
  shapes,
  backgroundImage,
  templateId = null,
  currentTemplate = null,
  onSaveSuccess,
}) => {
  const [templateName, setTemplateName] = useState("");
  const [category, setCategory] = useState("custom");
  const [theme, setTheme] = useState("custom");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [saveMode, setSaveMode] = useState(templateId ? "update" : "create");

  const isUpdateMode = templateId && saveMode === "update";

  const handleSave = async () => {
    if (!isUpdateMode && !templateName.trim()) {
      setError("Please enter a template name");
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      let saved;
      if (isUpdateMode) {
        // Update existing template (or create new if built-in)
        saved = templateStorage.updateTemplateDesign(
          templateId,
          shapes,
          backgroundImage,
          currentTemplate // Pass current template for metadata
        );
      } else {
        // Create new template
        saved = templateStorage.createTemplateFromDesign(
          templateName,
          shapes,
          backgroundImage,
          {
            categorie: category,
            theme: theme,
            orientation: "portrait",
            price: "free",
          }
        );
      }

      setTemplateName("");
      onOpenChange(false);
      if (onSaveSuccess) {
        onSaveSuccess(saved);
      }
    } catch (err) {
      setError("Failed to save template: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenChange = (newOpen) => {
    if (!newOpen) {
      setTemplateName("");
      setError("");
      setSaveMode(templateId ? "update" : "create");
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isUpdateMode ? "Update Template" : "Save as Template"}
          </DialogTitle>
          <DialogDescription>
            {isUpdateMode
              ? "Update the current template with your changes"
              : "Save your design as a reusable template"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {templateId && !isUpdateMode && (
            <div className="space-y-2">
              <Label>Save Mode</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={saveMode === "update"}
                    onChange={() => setSaveMode("update")}
                    disabled={isSaving}
                  />
                  <span className="text-sm">Update existing</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={saveMode === "create"}
                    onChange={() => setSaveMode("create")}
                    disabled={isSaving}
                  />
                  <span className="text-sm">Create new</span>
                </label>
              </div>
            </div>
          )}

          {isUpdateMode ? (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">
                This will update the existing template with your current design changes. All modifications will be saved automatically.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="template-name">Template Name</Label>
                <Input
                  id="template-name"
                  placeholder="e.g., Gold Wedding Invitation"
                  value={templateName}
                  onChange={(e) => {
                    setTemplateName(e.target.value);
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory} disabled={isSaving}>
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom">Custom</SelectItem>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="elegant">Elegant</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="romantic">Romantic</SelectItem>
                    <SelectItem value="floral">Floral</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={theme} onValueChange={setTheme} disabled={isSaving}>
                  <SelectTrigger id="theme">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom">Custom</SelectItem>
                    <SelectItem value="classic">Classic</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="vintage">Vintage</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                    <SelectItem value="romantic">Romantic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}
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
            {isSaving
              ? "Saving..."
              : isUpdateMode
              ? "Update Template"
              : "Save Template"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
