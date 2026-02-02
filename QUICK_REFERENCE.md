# Image & Layer Quick Reference

## 🖼️ Image Editing

### Add Image:
1. Click **Image** button in toolbar
2. Select image file
3. Image appears on canvas

### Edit Image:
- **Move**: Click and drag
- **Resize**: Drag corner handles
- **Rotate**: Drag rotation handle (top)
- **Replace**: Properties → "Replace Image" button
- **Opacity**: Properties → Opacity slider (0-100%)
- **Size**: Properties → Width × Height inputs
- **Position**: Properties → X, Y inputs

### Replace Image (Keeps Position/Size):
```
1. Select image on canvas
2. Properties tab → "Replace Image"
3. Choose new file
4. ✅ Position preserved
5. ✅ Size preserved
6. ✅ Rotation preserved
```

---

## 📚 Layer System

### Layer Panel (Right Sidebar):
```
Properties | [Layers] ← Click here
────────────────────────────
Layer 5: 📝 "Wedding Text"   👁 🔓
Layer 4: 🖼️ Image            👁 🔓
Layer 3: ⬜ Rectangle         👁 🔓
Layer 2: 📝 "Date"            👁 🔓
Layer 1: 🖼️ Background       👁 🔓
```

### Layer Actions:
| Button | Action | Result |
|--------|--------|--------|
| **⇈ To Front** | Move to top | Element above all |
| **⇊ To Back** | Move to bottom | Element below all |
| **↑ Forward** | Move up 1 layer | One step higher |
| **↓ Backward** | Move down 1 layer | One step lower |

### Quick Layer Tips:
- **Top layer** = Front (visible on top)
- **Bottom layer** = Back (behind everything)
- Click element in list to select
- Layer number shows position in stack

---

## 👁️ Visibility & 🔒 Lock

### Visibility (Eye Icon):
- **👁 Open Eye** = Visible
- **👁 Closed Eye** = Hidden
- Hidden elements don't export
- Still in layer list (can show again)

### Lock (Lock Icon):
- **🔓 Unlocked** = Editable
- **🔒 Locked** = Protected
- Locked elements:
  - Can't move
  - Can't resize
  - Can't rotate
  - Can't delete
  - Still visible

---

## 🎨 Common Workflows

### Background Image:
```
1. Add image → 2. Select → 3. "To Back"
4. Add text on top → 5. Perfect!
```

### Replace Logo:
```
1. Select logo image → 2. "Replace Image"
3. Choose new logo → 4. Position stays same!
```

### Hide for Preview:
```
1. Layers tab → 2. Click 👁 on watermark
3. Preview clean design → 4. Click 👁 again to restore
```

### Protect Background:
```
1. Select background → 2. Click 🔓 (becomes 🔒)
3. Can't accidentally move → 4. Safe to work on top
```

---

## 🎯 Selection & Editing

### All Elements Support:
✅ Click to select
✅ Drag to move
✅ Corner handles to resize
✅ Rotation handle to rotate
✅ Properties panel to fine-tune
✅ Layer controls
✅ Visibility toggle
✅ Lock/unlock

### Element Types:
- **📝 Text**: Font, size, color, alignment
- **🖼️ Image**: Replace, resize, opacity
- **⬜ Rectangle**: Width, height, color, corners
- **⭕ Circle**: Radius, fill, stroke
- **🔺 Triangle**: Size, color
- **⭐ Star**: Points, radius
- **➖ Line**: Thickness, color
- **➡️ Arrow**: Thickness, pointer size

---

## ⌨️ Shortcuts (if available)

| Key | Action |
|-----|--------|
| `Delete` | Delete selected |
| `Ctrl+D` | Duplicate |
| `Ctrl+]` | Forward |
| `Ctrl+[` | Backward |
| `Ctrl+Shift+]` | To Front |
| `Ctrl+Shift+[` | To Back |

---

## 💡 Pro Tips

### 1. **Layer Order Matters**
   - Canvas renders bottom → top
   - Background always at bottom
   - Text usually on top

### 2. **Lock the Background**
   - Prevents accidental moves
   - Safe to work on other elements

### 3. **Hide Complex Elements**
   - Faster canvas performance
   - Preview simplified design

### 4. **Replace vs Delete+Add**
   - Replace preserves position
   - Replace preserves size
   - Much faster workflow!

### 5. **Use Layers Panel**
   - See all elements at once
   - Quick selection
   - Easy reordering

### 6. **Name Your Layers** (by text content)
   - Text shows first 20 chars
   - Easy to find later

---

## 🚨 Common Issues

### Can't Move Element?
→ Check if it's **locked** 🔒 in Layers panel

### Element Disappeared?
→ Check if **hidden** 👁 in Layers panel

### Can't See Element?
→ Check if behind another layer (use **To Front**)

### Image Won't Replace?
→ Make sure you've **selected** the image first

### Canvas Slow?
→ Hide non-essential elements while working

---

## 📱 Mobile vs Desktop

### Desktop:
- Left panel: Tools
- Right panel: Properties/Layers (tabs)
- Full canvas view
- All features available

### Mobile:
- Bottom drawer: Tools
- Swipe panels: Properties/Layers
- Touch gestures for zoom/pan
- Same features, optimized UI

---

## ✅ Quick Checklist

Before Exporting:
- [ ] All elements in correct layer order
- [ ] Unwanted elements hidden or deleted
- [ ] Background locked if needed
- [ ] Text readable on top
- [ ] Images at correct size
- [ ] No accidental overlaps
- [ ] Preview in Layers panel looks good

---

**Need Help?** 
- Check [IMAGE_LAYER_SYSTEM.md](IMAGE_LAYER_SYSTEM.md) for detailed docs
- All features work with text, images, and shapes
- Layers panel shows real-time state

**Version**: 3.0 | **Status**: Production Ready ✅
