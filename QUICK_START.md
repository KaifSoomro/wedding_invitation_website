# 🚀 Quick Start Guide - Wedding Card Editor

## 📦 Installation (1 minute)

\`\`\`bash
# Clone or navigate to project
cd wedding_invitation_website

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

Open browser to: http://localhost:5173

## 🎨 Using the Editor

### Access Editor
- **From Home**: Click any template → Opens editor with template
- **Blank Canvas**: Navigate to `/editor` → Start from scratch

### Desktop Layout
\`\`\`
┌─────────────────────────────────────────────┐
│  🛠️ Toolbar (Tools + Zoom + Export)        │
├──────┬───────────────────────┬──────────────┤
│      │                       │              │
│ 📚   │   🎨 Canvas Area     │  ⚙️          │
│ Tool │                       │ Properties   │
│ Panel│   (Drag, Resize,     │ Panel        │
│      │    Rotate Elements)   │              │
│      │                       │              │
└──────┴───────────────────────┴──────────────┘
\`\`\`

### Mobile Layout
\`\`\`
┌─────────────────────────────┐
│  🛠️ Toolbar (Compact)      │
├─────────────────────────────┤
│                             │
│   🎨 Canvas                │
│   (Full Screen)             │
│   Pinch to Zoom             │
│                             │
├─────────────────────────────┤
│  [Tools] [Properties]       │
│  (Bottom Drawer Buttons)    │
└─────────────────────────────┘
\`\`\`

## ⌨️ Essential Shortcuts

| Key | Action |
|-----|--------|
| **T** | Add Text |
| **R** | Rectangle |
| **O** | Circle |
| **I** | Import Image |
| **Space + Drag** | Pan Canvas |
| **Ctrl/Cmd + Z** | Undo |
| **Delete** | Remove Selected |
| **?** | Show All Shortcuts |

## 🎯 Common Tasks

### 1. Add Text
\`\`\`
Method 1 (Quick):
1. Press T
2. Click canvas
3. Type your text

Method 2 (Precise):
1. Click "Text" button in toolbar
2. Click exactly where you want text
3. Edit in properties panel (right side)
\`\`\`

### 2. Edit Text Properties
\`\`\`
1. Select text on canvas
2. Right panel shows all properties:
   - Font family
   - Font size
   - Bold/Italic
   - Alignment
   - Letter spacing
   - Opacity
3. Change any property → Updates live
\`\`\`

### 3. Add Image
\`\`\`
Method 1 (Upload):
1. Click "Image" tool in toolbar
2. Select file from computer
3. Drag to position

Method 2 (Drag & Drop):
1. Drag image file from desktop
2. Drop onto canvas
3. Auto-places at drop location

Method 3 (URL):
1. Click "Add via URL" button
2. Paste image URL
3. Image loads onto canvas
\`\`\`

### 4. Add Shapes
\`\`\`
1. Click shape tool (Rectangle, Circle, etc.)
2. Click canvas to place
3. Drag corners to resize
4. Rotate handle to rotate
5. Edit colors in properties panel
\`\`\`

### 5. Add Stickers
\`\`\`
1. Open left panel "Stickers" tab
2. Search or browse wedding emojis
3. Click emoji → Adds to canvas
4. Drag to reposition
\`\`\`

### 6. Zoom & Pan
\`\`\`
Desktop:
- Scroll wheel → Zoom in/out
- Space + Drag → Pan around
- Zoom buttons → Precise control

Mobile:
- Pinch (two fingers) → Zoom
- Two-finger drag → Pan
\`\`\`

### 7. Layer Management
\`\`\`
1. Select element
2. Properties panel shows:
   - [Front] - Bring to top
   - [Back] - Send to bottom
   - [Duplicate] - Make copy
3. Click to reorder layers
\`\`\`

### 8. Export Design
\`\`\`
1. Click "Export" button (top right)
2. Choose format:
   - PNG (recommended)
   - JPEG
   - PDF
3. Select quality:
   - 1x → Web preview
   - 2x → High quality
   - 4x → Print ready
4. Click "Export" → Downloads file
\`\`\`

## 📱 Mobile Tips

### Touch Gestures
- **Single Tap**: Select element
- **Double Tap**: Edit text
- **Pinch**: Zoom in/out
- **Two-Finger Drag**: Pan canvas
- **Drag Element**: Move it

### Mobile Workflow
1. Use bottom drawer to switch between:
   - **Tools** (add elements)
   - **Properties** (edit selected)
2. Canvas is full-screen for focus
3. Zoom in for precision
4. Zoom out for overview

## 🎨 Design Tips

### Professional Cards
1. **Start with template** (Home → Select template)
2. **Customize text** (names, dates, venue)
3. **Adjust colors** (match theme)
4. **Add personal touches** (photos, stickers)
5. **Export high quality** (4x for print)

### Text Hierarchy
- **Bride & Groom Names**: 48-72px, bold
- **Event Details**: 24-36px, regular
- **Venue/Date**: 18-24px, italic
- **RSVP Info**: 14-18px, small caps

### Color Harmony
- Use 2-3 main colors
- White/cream for background
- Gold/rose gold accents
- Soft pastels for romance

## 🐛 Troubleshooting

### Canvas Won't Load
\`\`\`bash
# Clear browser cache
Ctrl+Shift+Del (Windows/Linux)
Cmd+Shift+Del (Mac)

# Clear localStorage
1. Open DevTools (F12)
2. Application → Storage → Clear site data
3. Refresh page
\`\`\`

### Elements Won't Move
- **Check**: Is element selected? (Should show transform handles)
- **Fix**: Click element to select, then drag

### Export Looks Blurry
- **Cause**: Quality setting too low
- **Fix**: Use 3x or 4x quality in export modal

### Keyboard Shortcuts Not Working
- **Cause**: Focus in text input
- **Fix**: Click canvas area first

### Mobile Zoom Not Working
- **Cause**: Browser touch events disabled
- **Fix**: Try Chrome/Safari, ensure HTTPS/localhost

## 📚 Learn More

- [Full Documentation](./EDITOR_README.md)
- [Feature Guide](./README.md)
- [Deployment Guide](./DEPLOYMENT_SUMMARY.md)
- [Keyboard Shortcuts](#) (Click ? in editor)

## 💡 Pro Tips

1. **Save Often**: Auto-save works, but refresh to be sure
2. **Use Shortcuts**: Memorize T, R, O for speed
3. **Zoom for Precision**: Zoom in 200%+ for pixel-perfect placement
4. **Duplicate Smart**: Duplicate similar elements for consistency
5. **Export Early**: Test export before finalizing design
6. **Mobile Preview**: Check design on mobile before sharing

## 🎉 You're Ready!

Start creating beautiful wedding cards!

1. Open editor: http://localhost:5173/editor
2. Add text, shapes, images
3. Customize to perfection
4. Export and share

**Happy designing! 💒💍✨**

---

**Need Help?** Check the full documentation or open DevTools console for debug info.
