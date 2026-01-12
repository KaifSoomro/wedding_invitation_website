# Wedding Invitation Website - Professional Canvas Editor

A complete, **production-ready** wedding card design platform with a Canva-like editor. Fully responsive, mobile-optimized, feature-rich, and enterprise-grade.

## 🎉 Production Ready

✅ Security headers & HTTPS  
✅ SEO optimized with sitemap  
✅ Privacy Policy & Terms  
✅ Analytics & error tracking  
✅ PWA with offline support  
✅ Full test suite  
✅ Accessibility features  
✅ Help & documentation

## 🚀 Quick Start

\`\`\`bash
# Install dependencies
npm install

# Run tests (optional)
npm test

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel --prod
\`\`\`

## ✨ Features

### 🎨 Professional Canvas Editor
- **Full-Screen Editor**: Dedicated editor layout without navbar
- **Responsive Design**: Desktop (panels) + Mobile (bottom drawers)
- **Touch Gestures**: Pinch-to-zoom, two-finger pan on mobile
- **Real-time Editing**: No lag, smooth 60fps interactions
- **Auto-save**: Persistent across sessions (localStorage)

### 🛠️ Complete Toolset
- Text with advanced typography controls
- Shapes (Rectangle, Circle, Triangle, Star)
- Lines & Arrows
- Image upload (file/URL/drag-drop)
- Wedding stickers library
- Transform tools (move, resize, rotate)
- Layer management (front/back)
- Duplicate elements
- Undo/Redo with full history

### 📱 Mobile First
- Collapsible panels on desktop
- Bottom drawer sheets on mobile
- Touch-optimized controls
- Responsive canvas sizing
- Mobile-friendly export

### 💾 Export Options
- PNG, JPEG, PDF formats
- Quality settings (1x-4x)
- Clean professional output
- Batch export ready

### ⌨️ Keyboard Shortcuts
See full list in editor help modal (? icon) or [EDITOR_README.md](./EDITOR_README.md)

## 📁 Project Structure

\`\`\`
src/
├── pages/
│   ├── CanvasEditor.jsx          # Main unified editor
│   ├── Home.jsx                  # Landing page
│   ├── Template.jsx              # Template browser
│   └── ...
├── components/
│   ├── editor/                   # Editor components
│   │   ├── EditorLayout.jsx      # Responsive layout
│   │   ├── EditorToolbar.jsx     # Top toolbar
│   │   ├── ToolsPanel.jsx        # Elements library
│   │   ├── PropertiesPanel.jsx   # Properties editor
│   │   ├── CanvasArea.jsx        # Konva canvas
│   │   └── ShortcutsHelp.jsx     # Help modal
│   └── ui/                       # Radix UI components
├── hooks/
│   ├── useCanvasEngine.js        # Core editor engine
│   ├── useTouchGestures.js       # Mobile touch support
│   └── use-mobile.js             # Responsive hook
└── App.jsx                        # Router
\`\`\`

## 🎯 Tech Stack

- **React 19** - Latest React with concurrent features
- **Vite 7** - Lightning-fast dev & build
- **Konva 10** - Professional canvas rendering
- **Radix UI** - Accessible component primitives
- **Tailwind CSS 4** - Modern utility-first styling
- **Redux Toolkit** - State management
- **jsPDF** - PDF export
- **React Router 7** - Client-side routing

## 📖 Documentation

- [Editor Documentation](./EDITOR_README.md) - Complete editor feature guide
- [Keyboard Shortcuts](./EDITOR_README.md#-keyboard-shortcuts) - Full shortcut list
- [Architecture](./EDITOR_README.md#-architecture) - Technical deep dive

## 🎨 Usage

### Editor Access
- **From Template**: `/editor/:id` - Edit specific template
- **Blank Canvas**: `/editor` - Start from scratch

### Basic Workflow
1. Click tool in toolbar (or press keyboard shortcut)
2. Click canvas to place element
3. Edit properties in right panel
4. Export when ready

### Advanced Tips
- **Quick Text**: Press T, click, type
- **Mobile Zoom**: Pinch with two fingers
- **Pan Canvas**: Hold Space + drag (or two-finger drag on mobile)
- **Inline Edit**: Double-click text to edit in place
- **Duplicate**: Select element, click Duplicate button
- **Layer Order**: Use Front/Back buttons

## 🔧 Development

### Adding New Tools
1. Add tool to `EditorToolbar.jsx` tools array
2. Implement shape factory in `useCanvasEngine.js`
3. Add render case in `CanvasArea.jsx` renderShape
4. Update keyboard shortcut in engine

### Customization
- **Canvas Size**: Change `CANVAS_WIDTH` and `CANVAS_HEIGHT` in `CanvasEditor.jsx`
- **Stickers**: Add to `ToolsPanel.jsx` sampleStickers array
- **Fonts**: Update font list in `PropertiesPanel.jsx`
- **Colors**: Modify color palette in original template data

## 🐛 Troubleshooting

### Editor not loading
- Check browser console for errors
- Ensure all dependencies installed (`npm install`)
- Clear browser cache and localStorage

### Touch gestures not working
- Ensure running on HTTPS or localhost
- Check browser touch event support
- Try refreshing the page

### Export quality issues
- Use higher quality setting (2x-4x)
- Ensure canvas content within bounds
- Try different export format

## 📝 Migration from Old Editors

The new `CanvasEditor` replaces both `Editor.jsx` and `NewEditor.jsx`:
- ✅ All features preserved
- ✅ Better performance
- ✅ Mobile responsive
- ✅ Cleaner code
- ✅ Professional UX

Old editors remain in codebase but are not routed.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file

## 🙏 Acknowledgments

- [Konva.js](https://konvajs.org/) for canvas rendering
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vite.dev/) for blazing-fast builds

---

**Made with ❤️ for creating beautiful wedding invitations**
