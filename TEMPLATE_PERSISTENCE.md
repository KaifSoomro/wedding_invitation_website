# Template Persistence Feature - Complete Guide

## Overview
A complete template management system has been implemented that allows users to:
- Save their current design as a new template
- Update existing templates with new changes
- Manage all saved templates systematically
- Persist templates to localStorage

## Key Features

### 1. **Save as Template** (`SaveTemplateModal.jsx`)
- Save current design as a new reusable template
- Update existing template if editing one
- Name templates with meaningful titles
- Categorize by type (Wedding, Elegant, Modern, etc.)
- Assign themes (Classic, Vintage, Luxury, etc.)
- Choose to create new or update existing

### 2. **Manage Templates** (`ManageTemplatesModal.jsx`)
- View all custom saved templates
- Load any template to continue editing
- Delete templates with confirmation
- Export templates as JSON backup
- Import templates from JSON file
- Shows element count and modification dates

### 3. **Template Storage Service** (`templateStorage.js`)
Core functions:
- `saveTemplate()` - Create or update template
- `updateTemplateDesign()` - Update template content only
- `createTemplateFromDesign()` - Create new from current design
- `getTemplate()` - Retrieve specific template
- `deleteTemplate()` - Remove template
- `getAllTemplates()` - Get all custom templates
- `getCustomTemplates()` - Filter custom templates
- `exportTemplates()` - Download as JSON
- `importTemplates()` - Upload from JSON
- `getMergedTemplates()` - Combine with built-in templates

## How It Works

### Save as Template
1. Click **Save as Template** button (💾) in toolbar
2. If editing existing template:
   - Choose "Update existing" to modify that template
   - Or "Create new" to save as separate template
3. If new design:
   - Enter template name
   - Select category and theme
   - Click "Save Template"

### Update Template
1. Load a template from **Manage Templates**
2. Make changes to design
3. Click **Save as Template**
4. Select "Update existing"
5. Confirm to save changes

### Manage Templates
1. Click **Manage Templates** button (📁)
2. View all saved templates
3. Click **Load** to continue editing
4. Click trash icon to delete
5. **Export** for backup
6. **Import** to restore

## Data Structure

```javascript
{
  id: 1706642400000,              // Auto-generated timestamp
  name: "Gold Wedding Invitation",
  backgroundImage: "https://...",
  backgroundColor: "bg-cyan-300",
  thumbnail: "https://...",
  categorie: "wedding",           // custom, wedding, elegant, etc.
  term: "custom",
  orientation: "portrait",
  theme: "luxury",                // classic, vintage, modern, etc.
  price: "free",
  shapes: [...],                  // Array of shape objects
  createdAt: "2024-01-30T10:00:00.000Z",
  updatedAt: "2024-01-30T10:30:00.000Z"
}
```

## Storage & Persistence

### Local Storage
- **Key**: `wedding_templates`
- **Type**: JSON array
- **Persistence**: Browser-based, survives page refreshes
- **Scope**: Per browser/device

### TemplateData Integration
- Built-in templates from `TemplateData.js` remain unchanged
- Custom templates stored separately in localStorage
- Merge both when needed using `getMergedTemplates()`
- No backend required

## State Tracking

**In CanvasEditor:**
```javascript
const [currentTemplateId, setCurrentTemplateId] = useState(id ? Number(id) : null);
```

- Tracks which template user is editing
- Set to null when editing new designs
- Set to template ID when loading from templates
- Enables "Update existing" option in save modal

## File Structure

Created/Modified:
- ✅ `src/services/templateStorage.js` - NEW: Storage service
- ✅ `src/components/editor/SaveTemplateModal.jsx` - NEW: Save dialog
- ✅ `src/components/editor/ManageTemplatesModal.jsx` - NEW: Manager
- ✅ `src/components/editor/EditorToolbar.jsx` - MODIFIED: Added buttons
- ✅ `src/pages/CanvasEditor.jsx` - MODIFIED: Integrated handlers

## Example Usage

```javascript
// Save new template
const template = templateStorage.createTemplateFromDesign(
  "My Wedding Template",
  shapes,
  backgroundImage,
  { categorie: "wedding", theme: "luxury" }
);

// Update existing template
templateStorage.updateTemplateDesign(templateId, shapes, backgroundImage);

// Load template
const template = templateStorage.getTemplate(templateId);
setShapes(template.shapes);
setBgUrl(template.backgroundImage);
```

## User Benefits

1. **Reusability** - Save designs as templates for future use
2. **Consistency** - Update templates and all future designs inherit changes
3. **Organization** - Categorize and manage templates systematically
4. **Backup** - Export/import templates for safety
5. **No Backend** - All stored locally, no internet needed
6. **Persistence** - Templates survive browser refreshes

## Technical Benefits

1. **Systematic Approach** - Clear flow for template operations
2. **ID Tracking** - Knows which template is being edited
3. **Auto-Update Option** - Update existing template or create new
4. **Full CRUD** - Complete create, read, update, delete operations
5. **Import/Export** - Backup and restore functionality
6. **Type Safety** - Structured template objects
