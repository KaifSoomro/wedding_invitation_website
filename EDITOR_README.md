# Wedding Card Editor - Complete Professional Canvas Editor

## 🎯 Overview

A production-ready, professional wedding card design editor built with React, Konva, and modern UI components. Fully responsive, touch-enabled, and feature-complete like Canva.

## ✨ Features

### 🎨 Professional Editor Interface
- **Responsive Layout**: Mobile-first design with collapsible panels
- **Top Toolbar**: Quick access to all tools with tooltips
- **Left Panel**: Elements library (shapes, stickers)
- **Right Panel**: Context-aware properties editor
- **Center Canvas**: Resizable, zoomable design area

### 🛠️ Tools & Elements
- **Text Tool**: Click-to-place with inline editing (double-click)
  - Font family, size, alignment
  - Bold, italic styling
  - Letter spacing, line height
  - Stroke color and width
  - Opacity control
- **Shapes**: Rectangle, Circle, Triangle, Star
- **Lines & Arrows**: Customizable stroke and pointers
- **Images**: Upload from file or URL
- **Stickers**: Wedding-themed emoji library with search

### 🎯 Advanced Features
- **Multi-layer System**: Bring to front, send to back
- **Transform Controls**: Drag, resize, rotate with handles
- **Undo/Redo**: Full history tracking
- **Zoom & Pan**: Mouse wheel zoom, space-bar pan, pinch-to-zoom (mobile)
- **Keyboard Shortcuts**: Speed up workflow (T for text, R for rectangle, etc.)
- **Drag & Drop**: Drop images directly onto canvas
- **Inline Text Editing**: Double-click text to edit in place
- **Click-to-Place**: Click mode for precise element placement

### 📱 Mobile Optimized
- **Touch Gestures**: Pinch-to-zoom, two-finger pan
- **Bottom Drawer**: Tools and properties in mobile sheets
- **Responsive Canvas**: Adapts to screen size
- **Touch-Friendly Controls**: Large tap targets

### 💾 Export & Save
- **Multiple Formats**: PNG, JPEG, PDF
- **Quality Control**: 1x to 4x resolution multiplier
- **Auto-save**: LocalStorage persistence per template
- **Professional Export**: Clean output without UI elements

### ⌨️ Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| T | Add Text |
| R | Add Rectangle |
| O | Add Circle |
| P | Add Triangle |
| S | Add Star |
| L | Add Line |
| A | Add Arrow |
| I | Import Image |
| Ctrl/Cmd + Z | Undo |
| Ctrl/Cmd + Y | Redo |
| Delete/Backspace | Delete Selected |
| Ctrl/Cmd + N | Clear Canvas |
| Space + Drag | Pan Canvas |
| Mouse Wheel | Zoom |

## 🚀 Getting Started

### Installation
\`\`\`bash
npm install
\`\`\`

### Development
\`\`\`bash
npm run dev
\`\`\`

### Build
\`\`\`bash
npm run build
\`\`\`

## 📁 Project Structure

\`\`\`
src/
├── components/
│   ├── editor/
│   │   ├── EditorLayout.jsx      # Responsive layout system
│   │   ├── EditorToolbar.jsx     # Top toolbar with tools
│   │   ├── ToolsPanel.jsx        # Left panel - elements
│   │   ├── PropertiesPanel.jsx   # Right panel - properties
│   │   ├── CanvasArea.jsx        # Main canvas renderer
│   │   └── ShortcutsHelp.jsx     # Keyboard shortcuts modal
│   └── ui/                        # Radix UI components
├── hooks/
│   ├── useCanvasEngine.js        # Core canvas logic & state
│   ├── useTouchGestures.js       # Mobile touch support
│   └── use-mobile.js             # Responsive breakpoint hook
├── pages/
│   └── CanvasEditor.jsx          # Main editor orchestrator
└── App.jsx                        # Router configuration
\`\`\`

## 🎨 Tech Stack

- **React 19** - UI framework
- **Konva / React-Konva** - Canvas rendering
- **Radix UI** - Accessible components
- **Tailwind CSS 4** - Styling
- **Vite 7** - Build tool
- **jsPDF** - PDF export
- **Redux Toolkit** - State management
- **React Router 7** - Navigation

## 🔧 Architecture

### Canvas Engine
The `useCanvasEngine` hook centralizes all canvas operations:
- Shape CRUD operations
- History management (undo/redo)
- Zoom/pan state
- Image import
- Color management
- Keyboard shortcuts
- Drag & drop
- LocalStorage persistence

### Responsive Design
- **Desktop** (≥768px): Three-column layout with collapsible panels
- **Mobile** (<768px): Full-screen canvas with bottom drawer panels
- **Touch Support**: Pinch zoom, two-finger pan via `useTouchGestures`

### Component Architecture
- **EditorLayout**: Handles responsive layout switching
- **EditorToolbar**: Tool selection and global actions
- **ToolsPanel**: Element library with tabs
- **PropertiesPanel**: Dynamic property editor based on selection
- **CanvasArea**: Konva stage with shape rendering

## 🎯 Design Decisions

### No Document Interference
- Canvas transforms are isolated (no page scroll issues)
- Inline text editing uses fixed-position overlay
- Keyboard shortcuts respect input focus
- Boundary constraints prevent out-of-canvas dragging

### Professional UX
- Loading states and skeletons
- Tooltips on all tools
- Keyboard shortcuts help modal
- ARIA labels for accessibility
- Error boundaries (planned)
- Consistent spacing and typography

### Performance
- Shape memoization in renderShape
- History stored as JSON strings (minimal memory)
- Transform optimization (scale resets)
- Efficient re-renders via proper React patterns

## 📝 Future Enhancements

- [ ] Smart alignment guides
- [ ] Snap to grid/objects
- [ ] Group/ungroup shapes
- [ ] Layers panel with visibility/lock
- [ ] Template gallery browser
- [ ] Background library
- [ ] Custom fonts upload
- [ ] Collaboration features
- [ ] Cloud save/load
- [ ] Animation timeline

## 🐛 Known Issues & Limitations

- No multi-select yet (shift+click planned)
- No grouping operations
- No alignment guides
- Export quality limited to 4x (sufficient for print)

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please ensure:
- Mobile responsiveness maintained
- Accessibility standards followed
- Code follows existing patterns
- Tests added for new features

## 💡 Usage Tips

1. **Quick Text**: Press T, click canvas, start typing
2. **Precise Placement**: Click tool button, then click exact position
3. **Mobile Zoom**: Use two fingers to pinch
4. **Quick Delete**: Select element, press Delete or Backspace
5. **Reset View**: Click maximize icon to reset zoom
6. **Export Quality**: Use 2x for web, 4x for print

## 🎓 Learning Resources

- [Konva Documentation](https://konvajs.org/)
- [React-Konva Guide](https://konvajs.org/docs/react/)
- [Radix UI Components](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Built with ❤️ for creating beautiful wedding invitations**
