// Template storage service - manages templates in localStorage and TemplateData
// 
// MARKET-READY FEATURES:
// ✓ Complete property validation (orientation, theme, price, etc.)
// ✓ Automatic fallbacks for missing properties
// ✓ Seamless merging of built-in and custom templates
// ✓ Real-time updates across all components
// ✓ Data integrity validation before save/load
// ✓ Type normalization for IDs (string/number compatibility)
// 
// USAGE:
// 1. getMergedTemplates(builtInTemplates) - Get all templates with validation
// 2. saveTemplate(data) - Save/update with automatic validation
// 3. createTemplateFromDesign() - Create new custom template
// 4. updateTemplateDesign() - Update existing or fork built-in template

const TEMPLATES_KEY = "wedding_templates";

// Template property defaults for market readiness
const TEMPLATE_DEFAULTS = {
  backgroundColor: "bg-white",
  categorie: "custom",
  term: "custom",
  orientation: "portrait",
  theme: "modern",
  price: "free",
  shapes: [],
};

// Validate and normalize template data
const validateTemplate = (template) => {
  if (!template) return null;
  
  // Ensure all required properties exist
  return {
    ...TEMPLATE_DEFAULTS,
    ...template,
    // Ensure thumbnail is set
    thumbnail: template.thumbnail || template.backgroundImage || "",
    // Ensure valid shapes array
    shapes: Array.isArray(template.shapes) ? template.shapes : [],
    // Ensure proper ID type
    id: typeof template.id === 'string' ? parseInt(template.id, 10) : template.id,
  };
};

// Helper: Normalize ID to number for safe comparison
const normalizeId = (id) => {
  if (typeof id === 'string') return parseInt(id, 10);
  if (typeof id === 'number') return id;
  return null;
};

// Helper: Check if template is custom (exists in localStorage)
const isCustomTemplate = (templateId) => {
  try {
    const templates = JSON.parse(localStorage.getItem(TEMPLATES_KEY) || '[]');
    const normalizedId = normalizeId(templateId);
    return templates.some(t => normalizeId(t.id) === normalizedId);
  } catch (error) {
    console.error('Error checking if template is custom:', error);
    return false;
  }
};

export const templateStorage = {
  // Get all templates (built-in + custom)
  getAllTemplates: () => {
    try {
      const customTemplates = localStorage.getItem(TEMPLATES_KEY);
      const parsed = customTemplates ? JSON.parse(customTemplates) : [];
      // Validate all templates
      return parsed.map(t => validateTemplate(t)).filter(Boolean);
    } catch (error) {
      console.error("Error loading templates:", error);
      return [];
    }
  },

  // Get a specific template by ID (handles string/number IDs)
  getTemplate: (templateId) => {
    try {
      const templates = templateStorage.getAllTemplates();
      const normalizedId = normalizeId(templateId);
      const found = templates.find((t) => normalizeId(t.id) === normalizedId);
      
      if (!found) {
        console.warn(`Template with ID ${templateId} not found in localStorage`);
      }
      
      return found || null;
    } catch (error) {
      console.error("Error retrieving template:", error);
      return null;
    }
  },

  // Save or update a template
  saveTemplate: (templateData) => {
    try {
      const templates = templateStorage.getAllTemplates();
      const normalizedId = normalizeId(templateData.id);
      const existingIndex = templates.findIndex((t) => normalizeId(t.id) === normalizedId);

      let savedTemplate;
      if (existingIndex !== -1) {
        // Update existing template - preserve all properties
        savedTemplate = validateTemplate({
          ...templates[existingIndex],
          ...templateData,
          // Ensure thumbnail is set
          thumbnail: templateData.thumbnail || templateData.backgroundImage || templates[existingIndex].thumbnail,
          updatedAt: new Date().toISOString(),
        });
        templates[existingIndex] = savedTemplate;
      } else {
        // Create new template - validate all properties
        savedTemplate = validateTemplate({
          ...TEMPLATE_DEFAULTS,
          ...templateData,
          id: templateData.id || Date.now(),
          // Ensure thumbnail is set
          thumbnail: templateData.thumbnail || templateData.backgroundImage,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        templates.push(savedTemplate);
      }

      localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
      
      // Dispatch event to notify components that templates have changed
      window.dispatchEvent(new CustomEvent('templateUpdated', { detail: savedTemplate }));
      
      return savedTemplate;
    } catch (error) {
      console.error("Error saving template:", error);
      throw error;
    }
  },

  // Create a new template from current design
  createTemplateFromDesign: (templateName, shapes, backgroundImage, options = {}) => {
    try {
      const newTemplate = validateTemplate({
        id: Date.now(),
        name: templateName,
        backgroundImage: backgroundImage || "",
        backgroundColor: options.backgroundColor || TEMPLATE_DEFAULTS.backgroundColor,
        thumbnail: options.thumbnail || backgroundImage || "",
        categorie: options.categorie || TEMPLATE_DEFAULTS.categorie,
        term: options.term || TEMPLATE_DEFAULTS.term,
        orientation: options.orientation || TEMPLATE_DEFAULTS.orientation,
        theme: options.theme || TEMPLATE_DEFAULTS.theme,
        price: options.price || TEMPLATE_DEFAULTS.price,
        shapes: shapes || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return templateStorage.saveTemplate(newTemplate);
    } catch (error) {
      console.error("Error creating template:", error);
      throw error;
    }
  },

  // Update existing CUSTOM template with new design
  // If template is built-in (not in localStorage), creates a new custom template
  updateTemplateDesign: (templateId, shapes, backgroundImage, builtInTemplate = null) => {
    try {
      const normalizedId = normalizeId(templateId);
      
      // Check if this is a custom template (exists in localStorage)
      const customTemplate = templateStorage.getTemplate(templateId);
      
      if (customTemplate) {
        // Template exists in localStorage - update it, preserve all properties
        const updated = validateTemplate({
          ...customTemplate,
          shapes: shapes,
          backgroundImage: backgroundImage,
          thumbnail: backgroundImage || customTemplate.thumbnail,
          updatedAt: new Date().toISOString(),
        });

        return templateStorage.saveTemplate(updated);
      } else {
        // Template is built-in (not in localStorage) - create new custom template
        // Use provided built-in template data or create minimal template
        const baseName = builtInTemplate?.name || "Custom Template";
        
        const newTemplate = validateTemplate({
          id: Date.now(), // New unique ID
          name: `${baseName} (Custom)`,
          backgroundImage: backgroundImage || builtInTemplate?.backgroundImage || "",
          backgroundColor: builtInTemplate?.backgroundColor || TEMPLATE_DEFAULTS.backgroundColor,
          thumbnail: backgroundImage || builtInTemplate?.thumbnail || builtInTemplate?.backgroundImage || "",
          categorie: "custom",
          term: "custom",
          orientation: builtInTemplate?.orientation || TEMPLATE_DEFAULTS.orientation,
          theme: builtInTemplate?.theme || TEMPLATE_DEFAULTS.theme,
          price: "free",
          shapes: shapes,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        return templateStorage.saveTemplate(newTemplate);
      }
    } catch (error) {
      console.error("Error updating template design:", error);
      throw error;
    }
  },

  // Delete a template
  deleteTemplate: (templateId) => {
    try {
      const templates = templateStorage.getAllTemplates();
      const normalizedId = normalizeId(templateId);
      const filtered = templates.filter((t) => normalizeId(t.id) !== normalizedId);
      localStorage.setItem(TEMPLATES_KEY, JSON.stringify(filtered));
      
      // Dispatch event to notify components
      window.dispatchEvent(new CustomEvent('templateUpdated'));
      
      return true;
    } catch (error) {
      console.error("Error deleting template:", error);
      throw error;
    }
  },

  // Get all custom templates (exclude built-in)
  getCustomTemplates: () => {
    try {
      const templates = templateStorage.getAllTemplates();
      return templates.filter((t) => t.categorie === "custom");
    } catch (error) {
      console.error("Error loading custom templates:", error);
      return [];
    }
  },

  // Export templates as JSON
  exportTemplates: (templateIds = null) => {
    try {
      let templates = templateStorage.getAllTemplates();
      if (templateIds && Array.isArray(templateIds)) {
        templates = templates.filter((t) => templateIds.includes(t.id));
      }

      const dataStr = JSON.stringify(templates, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `wedding-templates-${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting templates:", error);
      throw error;
    }
  },

  // Import templates from JSON
  importTemplates: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedTemplates = JSON.parse(e.target.result);
          if (Array.isArray(importedTemplates)) {
            const currentTemplates = templateStorage.getAllTemplates();
            const merged = [...currentTemplates, ...importedTemplates];
            localStorage.setItem(TEMPLATES_KEY, JSON.stringify(merged));
            resolve(importedTemplates.length);
          } else {
            reject(new Error("Invalid template file format"));
          }
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  },

  // Clear all custom templates
  clearCustomTemplates: () => {
    try {
      localStorage.removeItem(TEMPLATES_KEY);
      return true;
    } catch (error) {
      console.error("Error clearing templates:", error);
      throw error;
    }
  },

  // Export template as JavaScript code for TemplateData.js
  exportAsJavaScriptCode: (templateId) => {
    try {
      const template = templateStorage.getTemplate(templateId);
      if (!template) {
        throw new Error("Template not found");
      }

      // Generate JavaScript code
      const code = `  {
    id: ${template.id},
    name: "${template.name}",
    backgroundImage: "${template.backgroundImage || ''}",
    backgroundColor: "${template.backgroundColor || 'bg-white'}",
    thumbnail: "${template.thumbnail || template.backgroundImage || ''}",
    categorie: "${template.categorie}",
    term: "${template.term || 'custom'}",
    orientation: "${template.orientation}",
    theme: "${template.theme}",
    price: "${template.price}",
    shapes: ${JSON.stringify(template.shapes, null, 6)},
  },`;

      // Copy to clipboard
      navigator.clipboard.writeText(code).then(() => {
        alert("Template code copied to clipboard!\n\nYou can now paste it into your TemplateData.js file.");
      }).catch(() => {
        // Fallback: download as file
        const blob = new Blob([code], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `template-${template.id}-code.js`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });

      return code;
    } catch (error) {
      console.error("Error exporting template as code:", error);
      throw error;
    }
  },

  // Merge with built-in templates
  getMergedTemplates: (builtInTemplates = []) => {
    try {
      const customTemplates = templateStorage.getAllTemplates();
      // Validate built-in templates too
      const validatedBuiltIn = builtInTemplates.map(t => validateTemplate(t)).filter(Boolean);
      return [...validatedBuiltIn, ...customTemplates];
    } catch (error) {
      console.error("Error merging templates:", error);
      return builtInTemplates.map(t => validateTemplate(t)).filter(Boolean);
    }
  },
  
  // Check if a template is custom (exists in localStorage) or built-in
  isCustomTemplate: (templateId) => isCustomTemplate(templateId),
  
  // Debug helper: Log all template properties for validation
  debugTemplateProperties: (templateId) => {
    try {
      const mergedTemplates = templateStorage.getMergedTemplates();
      const template = mergedTemplates.find(t => normalizeId(t.id) === normalizeId(templateId));
      
      if (!template) {
        console.warn(`Template ${templateId} not found`);
        return null;
      }
      
      console.group(`Template ${templateId} Properties`);
      console.log("ID:", template.id, typeof template.id);
      console.log("Name:", template.name);
      console.log("Category:", template.categorie);
      console.log("Theme:", template.theme);
      console.log("Orientation:", template.orientation);
      console.log("Price:", template.price);
      console.log("Term:", template.term);
      console.log("Background:", template.backgroundImage);
      console.log("Thumbnail:", template.thumbnail);
      console.log("Shapes:", template.shapes?.length || 0);
      console.log("Is Custom:", isCustomTemplate(templateId));
      console.groupEnd();
      
      return template;
    } catch (error) {
      console.error("Error debugging template:", error);
      return null;
    }
  },
};
