import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { templateStorage } from "@/services/templateStorage";
import { Trash2, Upload, Download, Edit2, Copy, Code } from "lucide-react";

export const ManageTemplatesModal = ({
  open,
  onOpenChange,
  onLoadTemplate,
}) => {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      loadTemplates();
    }
  }, [open]);

  const loadTemplates = () => {
    try {
      const customTemplates = templateStorage.getCustomTemplates();
      setTemplates(customTemplates);
    } catch (error) {
      console.error("Error loading templates:", error);
    }
  };

  const handleDeleteTemplate = (templateId) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      try {
        templateStorage.deleteTemplate(templateId);
        loadTemplates();
      } catch (error) {
        console.error("Error deleting template:", error);
      }
    }
  };

  const handleLoadTemplate = (template) => {
    if (onLoadTemplate) {
      onLoadTemplate(template);
      onOpenChange(false);
    }
  };

  const handleExportAsCode = (templateId) => {
    try {
      templateStorage.exportAsJavaScriptCode(templateId);
    } catch (error) {
      console.error("Error exporting template as code:", error);
      alert("Failed to export template code");
    }
  };

  const handleExportTemplates = () => {
    try {
      const customIds = templates.map((t) => t.id);
      templateStorage.exportTemplates(customIds);
    } catch (error) {
      console.error("Error exporting templates:", error);
    }
  };

  const handleImportTemplates = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      templateStorage
        .importTemplates(file)
        .then(() => {
          loadTemplates();
        })
        .catch((error) => {
          console.error("Error importing templates:", error);
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
          <DialogTitle>Manage Templates</DialogTitle>
          <DialogDescription>
            View, load, or manage your custom templates
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Import/Export Buttons */}
          <div className="flex gap-2 justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportTemplates}
                disabled={templates.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Templates
              </Button>
              <div>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportTemplates}
                  className="hidden"
                  id="import-templates"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("import-templates").click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </div>
            </div>
          </div>

          {/* Templates List */}
          {templates.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-500 mb-4">No custom templates yet</p>
              <p className="text-sm text-neutral-400">
                Save your designs as templates to reuse them later
              </p>
            </div>
          ) : (
            <div className="grid gap-3">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{template.name}</h3>
                    <div className="flex gap-3 text-xs text-neutral-500">
                      <span>{template.theme || "custom"}</span>
                      <span>•</span>
                      <span>{template.shapes?.length || 0} elements</span>
                      <span>•</span>
                      <span>{formatDate(template.updatedAt || template.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleLoadTemplate(template)}
                      className="gap-2"
                    >
                      <Edit2 className="h-4 w-4" />
                      Load
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleExportAsCode(template.id)}
                      title="Export as code for TemplateData.js"
                    >
                      <Code className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteTemplate(template.id)}
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
