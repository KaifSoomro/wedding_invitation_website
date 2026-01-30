# Template System - Complete Guide

## Overview
Your wedding invitation app now has a **perfect template management system** that seamlessly integrates custom templates with built-in templates from TemplateData.js.

## How It Works

### 1. **Two Types of Templates**
- **Built-in Templates**: Stored in `src/TemplateData.js` (permanent, part of your source code)
- **Custom Templates**: Stored in browser localStorage (created/updated by users)

### 2. **Automatic Merging**
The system automatically merges both types:
- All pages (Template Gallery, Editor) show **both built-in AND custom templates**
- Custom templates have a **purple "Custom" badge** to distinguish them
- No conflicts - each template has a unique ID

### 3. **Creating Custom Templates**

#### From Editor:
1. Design your wedding card
2. Click **"💾 Save as Template"** button
3. Enter name, category, and theme
4. Click **"Save Template"**
5. ✅ Template is now available in the gallery!

#### Updating Existing Template:
1. Open a template in the editor (it will detect you're editing a template)
2. Make your changes
3. Click **"💾 Save as Template"**
4. Choose **"Update existing"** mode
5. Click **"Update Template"**
6. ✅ Template is updated!

### 4. **Managing Templates**

#### Manage Templates Modal:
- Click **"📁 Manage Templates"** in editor
- See all your custom templates
- **Load** - Open template in editor
- **<Code/> icon** - Export as code for TemplateData.js (see below)
- **Delete** - Remove custom template
- **Export** - Download all custom templates as JSON backup
- **Import** - Import templates from JSON file

### 5. **Making Custom Templates Permanent** ⭐

Want to add your custom template to `TemplateData.js` so it becomes a built-in template?

#### Step-by-Step:
1. Open **Manage Templates** modal
2. Find your custom template
3. Click the **<Code/> icon** button
4. The template code is **automatically copied to your clipboard!**
5. Open `src/TemplateData.js`
6. Paste the code inside the `templates` array
7. Save the file
8. ✅ Your template is now permanent!

#### Example:
```javascript
// src/TemplateData.js
export const templates = [
  {
    id: 1,
    name: "Gold orchids",
    // ... existing template
  },
  {
    id: 2,
    name: "Elegant Wedding Invite",
    // ... existing template
  },
  // 👇 PASTE YOUR CUSTOM TEMPLATE CODE HERE
  {
    id: 1738274529412,
    name: "My Amazing Template",
    backgroundImage: "https://...",
    categorie: "custom",
    shapes: [...],
  },
  // 👆
]
```

### 6. **Template Gallery**

The Template page (`/template`) automatically shows:
- ✅ All built-in templates from TemplateData.js
- ✅ All custom templates from localStorage
- ✅ Custom badge on user-created templates
- ✅ All filters work on both types

### 7. **Data Persistence**

#### Custom Templates:
- Stored in: `localStorage` with key `"wedding_templates"`
- Persists: Across browser sessions
- Backup: Export as JSON anytime
- Restore: Import JSON file

#### Built-in Templates:
- Stored in: `src/TemplateData.js`
- Persists: Permanently (part of source code)
- Version Control: Committed to git
- Deployment: Deployed with your app

### 8. **Workflow Example**

#### Scenario: Create and Promote a Template

```
1. User creates design in editor
   └─> Clicks "Save as Template"
       └─> Saved to localStorage as "custom" template

2. User sees template in gallery with "Custom" badge
   └─> Can use it like any built-in template

3. User loves the template, wants it permanent
   └─> Opens "Manage Templates"
       └─> Clicks <Code/> icon
           └─> Code copied to clipboard

4. Developer opens TemplateData.js
   └─> Pastes code into templates array
       └─> Saves file
           └─> Commits to git

5. Template is now built-in!
   └─> Available to all users
       └─> Survives localStorage clear
           └─> Part of the app
```

## Technical Details

### Files Modified:
- `src/components/TempComps/TempContent.jsx` - Merges templates for gallery
- `src/pages/CanvasEditor.jsx` - Loads merged templates
- `src/services/templateStorage.js` - Added `exportAsJavaScriptCode()` function
- `src/components/editor/ManageTemplatesModal.jsx` - Added export-as-code button

### Key Functions:

```javascript
// Get all custom templates
templateStorage.getAllTemplates()

// Merge built-in + custom
templateStorage.getMergedTemplates(builtInTemplates)

// Export template as JavaScript code
templateStorage.exportAsJavaScriptCode(templateId)

// Create new template
templateStorage.createTemplateFromDesign(name, shapes, bg, options)

// Update existing template
templateStorage.updateTemplateDesign(templateId, shapes, bg)
```

## Benefits

✅ **User-Friendly**: Create templates without touching code
✅ **Flexible**: Custom templates in localStorage, permanent ones in source
✅ **Seamless**: Both types work identically
✅ **No Conflicts**: Unique IDs prevent collisions
✅ **Easy Promotion**: One-click export to code
✅ **Persistent**: localStorage + source code = double persistence
✅ **Backups**: Export/Import JSON for custom templates
✅ **Visual Distinction**: Custom badge shows which are user-created

## Summary

Your template system is now **production-ready** with perfect integration between:
1. Built-in templates (TemplateData.js)
2. Custom templates (localStorage)
3. Easy promotion path (export as code)
4. Full CRUD operations
5. Automatic merging everywhere

Users can create unlimited custom templates, and you can easily promote the best ones to become permanent built-in templates by copying the generated code into TemplateData.js! 🎉
