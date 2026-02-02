# Image Selection & Update Guide

## ✅ Fixed Issues

### 1. **Select Images from Templates**
- ✅ Images from TemplateData are now fully selectable
- ✅ Click any image to select it (shows transform handles)
- ✅ Selected images can be moved, resized, rotated
- ✅ Selected images can be deleted (Delete key or Delete button)

### 2. **Update/Replace Images**
- ✅ Two ways to update images:
  1. **Upload new file** (Replace Image button)
  2. **Enter image URL** (URL input + Set button)

---

## 🎯 How to Use

### **Select an Image:**
```
1. Click on any image in the canvas
2. Transform handles appear (corners + rotation)
3. Properties panel shows image details
4. Can now edit, move, resize, delete
```

### **Delete an Image:**
```
Method 1: Select image → Press Delete/Backspace key
Method 2: Select image → Properties panel → Delete button
Method 3: Select image → Right-click → Delete (if context menu exists)
```

### **Replace Image (Upload File):**
```
1. Select the image you want to replace
2. Properties panel → Image Source section
3. Click "Replace Image (Upload)" button
4. Choose new image file
5. ✅ Position, size, rotation preserved!
```

### **Update Image (URL):**
```
1. Select the image you want to update
2. Properties panel → Image Source section
3. Enter new URL in the text field
4. Press Enter OR click "Set" button
5. ✅ Image updates, position preserved!
```

---

## 🖼️ Image Properties Panel

When an image is selected, you'll see:

```
┌──────────────────────────────────┐
│ Image Properties                 │
├──────────────────────────────────┤
│ [Image Preview]                  │
│ ┌──────────────────────────────┐ │
│ │  Current image displayed     │ │
│ │  (or "Failed to load")       │ │
│ └──────────────────────────────┘ │
│                                  │
│ Source: https://...              │
│                                  │
│ [Replace Image (Upload)]         │
│                                  │
│ Or enter image URL:              │
│ [URL input field]      [Set]     │
│                                  │
│ 💡 Position, size preserved      │
├──────────────────────────────────┤
│ Width: 200    Height: 150        │
│ Opacity: [slider] 100%           │
│ X: 100        Y: 150             │
│ Rotation: [slider] 0°            │
└──────────────────────────────────┘
```

---

## 🔧 Technical Improvements

### **CanvasArea.jsx:**
1. Enhanced `KImg` component with error handling
2. Shows placeholder if `imageSrc` is missing
3. Proper loading states (loading, failed, success)
4. Gray placeholder rectangle for missing images
5. Respects lock/visibility flags

### **PropertiesPanel.jsx:**
1. Image preview thumbnail
2. Shows current image source
3. Upload button with file picker
4. URL input with Enter key support
5. "Set" button for URL updates
6. Visual warnings for missing images
7. Tips and instructions

### **Image Shape Structure:**
```javascript
{
  id: 12345,
  type: "image",
  x: 100,
  y: 150,
  width: 200,
  height: 150,
  imageSrc: "https://..." or "data:image/...",
  opacity: 1,
  rotation: 0,
  visible: true,
  locked: false
}
```

---

## 🎨 Use Cases

### **Scenario 1: Template Image Not Loading**
```
Problem: Template has image URL but shows gray box
Solution: 
1. Click the gray placeholder
2. Properties → Enter working URL
3. Press Enter → Image loads!
```

### **Scenario 2: Want to Swap Logo**
```
1. Click existing logo image
2. "Replace Image (Upload)"
3. Choose new logo file
4. Logo swaps, keeps same size/position!
```

### **Scenario 3: Update from URL to Local**
```
1. Template has URL image (https://...)
2. Click image to select
3. "Replace Image (Upload)"
4. Choose local file
5. Now using uploaded image (data:image/...)
```

### **Scenario 4: Delete Unwanted Image**
```
1. Click image to select
2. Press Delete key
3. Image removed from canvas
```

---

## 🐛 Troubleshooting

### **Can't Select Image?**
- ✅ Make sure image is not locked (🔒 in Layers panel)
- ✅ Try clicking center of image, not edges
- ✅ Check if image is hidden (👁 in Layers panel)

### **Image Shows Gray Box?**
- ⚠️ Image source (`imageSrc`) is missing or invalid
- ✅ Select it and set a valid URL or upload file
- ✅ Check browser console for CORS errors

### **Image Not Updating?**
- ✅ Make sure image is selected first
- ✅ URL must be valid and accessible
- ✅ For uploaded files, file must be valid image format
- ✅ Check browser console for errors

### **Can't Delete Image?**
- ✅ Image might be locked (unlock in Layers panel)
- ✅ Make sure image is selected (has transform handles)
- ✅ Try using Delete button in Properties panel

---

## 📊 Image States

| State | Visual | Action |
|-------|--------|--------|
| **Normal** | Image visible | Click to select |
| **Selected** | Transform handles | Edit, move, resize |
| **Loading** | Nothing shown | Wait for load |
| **Failed** | Gray placeholder | Update URL or upload |
| **No Source** | Gray + warning | Set URL or upload |
| **Hidden** | Not on canvas | Show in Layers panel |
| **Locked** | Visible, can't edit | Unlock in Layers |

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Click` | Select image |
| `Delete` | Delete selected image |
| `Backspace` | Delete selected image |
| `Esc` | Deselect |
| `Ctrl+D` | Duplicate image |

---

## ✅ Checklist

### Before Exporting:
- [ ] All images loaded (no gray boxes)
- [ ] Images at correct size
- [ ] Images in correct layer order
- [ ] No unwanted images
- [ ] All `imageSrc` values valid

### After Replacing Image:
- [ ] New image loaded successfully
- [ ] Position is same as before
- [ ] Size is same as before
- [ ] Rotation preserved
- [ ] Other properties intact

---

## 🚀 Best Practices

1. **Use Local Upload for Production**
   - More reliable than external URLs
   - No CORS issues
   - Faster loading

2. **Always Check Preview**
   - Properties panel shows current image
   - Verify before exporting

3. **Name Your Images**
   - Use descriptive filenames
   - Easier to identify in Layers

4. **Lock Background Images**
   - Prevents accidental moves
   - Safer editing workflow

5. **Test Image URLs**
   - Paste in browser first
   - Ensure publicly accessible
   - Check for CORS headers

---

## 🎯 Summary

**What's Fixed:**
✅ Images from templates are selectable
✅ Images can be deleted
✅ Images can be updated/replaced
✅ Image properties editable
✅ Visual preview in Properties
✅ URL and upload support
✅ Position/size preservation
✅ Error handling and placeholders

**Status:** ✅ Fully Working
**Tested:** ✅ Select, Delete, Update
**Production Ready:** ✅ Yes

---

**Last Updated:** February 2, 2026
**Version:** 3.1 - Image Fix
