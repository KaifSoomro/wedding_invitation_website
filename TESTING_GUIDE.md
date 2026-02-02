# Quick Testing Guide

## ✅ Visual Testing Checklist

### 1. Template Page Test
- [ ] Navigate to `/templates`
- [ ] Verify all template cards display properly
- [ ] Hover over cards - overlay should appear with:
  - [ ] Template name
  - [ ] Orientation badge
  - [ ] Price badge
- [ ] Check theme badges in top-right corner
- [ ] Verify "Custom" badge on custom templates

### 2. Editor Loading Test
- [ ] Click any template card
- [ ] Editor should load with:
  - [ ] Correct background image
  - [ ] All text elements in correct positions
  - [ ] All properties preserved (check in properties panel)
- [ ] Try template ID 1, 2, 3 (built-in)
- [ ] Try your custom template IDs

### 3. Property Preservation Test
- [ ] Open template in editor
- [ ] Check if these are displayed:
  - [ ] Background image
  - [ ] Text elements with correct:
    - [ ] Font family
    - [ ] Font size
    - [ ] Color
    - [ ] Bold/Italic
    - [ ] Alignment
  - [ ] All shape properties

### 4. Error Handling Test
- [ ] Navigate to `/editor/99999` (invalid ID)
- [ ] Should see error page with:
  - [ ] "Template Not Found" message
  - [ ] "Go Back" button
  - [ ] "Browse Templates" button
- [ ] Click buttons - should navigate properly

### 5. Save/Load Test
- [ ] Create new custom template
- [ ] Save it with custom properties:
  ```
  Name: Test Template
  Theme: romantic
  Orientation: portrait
  ```
- [ ] Reload page
- [ ] Navigate back to templates
- [ ] Verify your template appears
- [ ] Click to edit
- [ ] Verify ALL properties preserved

## 🔍 Console Testing

Open browser console and run:

```javascript
// Test 1: Check all templates
const all = templateStorage.getMergedTemplates(templates);
console.log(`Total templates: ${all.length}`);
console.table(all.map(t => ({
  id: t.id,
  name: t.name,
  theme: t.theme,
  orientation: t.orientation,
  hasShapes: t.shapes?.length || 0,
  isCustom: templateStorage.isCustomTemplate(t.id)
})));
```

```javascript
// Test 2: Debug specific template
templateStorage.debugTemplateProperties(1); // Change ID as needed
```

```javascript
// Test 3: Check validation
const testTemplate = {
  id: 999,
  name: "Test",
  // Missing properties...
};
const saved = templateStorage.saveTemplate(testTemplate);
console.log("Saved with defaults:", saved);
// Should have all properties filled with defaults
```

## 🎯 Expected Results

### Template Cards Should Show:
- ✅ Proper image or gradient placeholder
- ✅ Smooth hover animation
- ✅ Info overlay on hover
- ✅ Badge for theme/custom status
- ✅ No broken images
- ✅ Fast loading

### Editor Should Have:
- ✅ Correct background immediately
- ✅ All text elements in place
- ✅ Editable text with preserved formatting
- ✅ Working properties panel
- ✅ All tools functional

### Console Should Show:
- ✅ No errors
- ✅ No warnings (except expected validation logs)
- ✅ Proper template counts
- ✅ All properties present when debugging

## 🐛 If Something's Wrong

### Problem: Template properties not showing
**Check:**
```javascript
templateStorage.debugTemplateProperties(YOUR_TEMPLATE_ID);
```
Look for any missing properties.

### Problem: Template not loading
**Check:**
1. Console for errors
2. Network tab for image loading
3. localStorage:
```javascript
JSON.parse(localStorage.getItem('wedding_templates'))
```

### Problem: Custom templates not appearing
**Check:**
```javascript
templateStorage.getAllTemplates();
// Should return your custom templates
```

### Problem: Old templates missing properties
**Solution:** They're auto-fixed! Just verify:
```javascript
const t = templateStorage.getTemplate(YOUR_ID);
console.log(t); // Should have all properties
```

## 📱 Device Testing

- [ ] Desktop Chrome
- [ ] Desktop Firefox
- [ ] Desktop Safari
- [ ] Mobile Chrome
- [ ] Mobile Safari
- [ ] Tablet

## ⚡ Performance Check

- [ ] Template page loads < 2 seconds
- [ ] Editor initializes < 1 second
- [ ] Hover interactions smooth (60fps)
- [ ] No layout shifts
- [ ] Images load progressively

## 🎨 Visual Quality

- [ ] All fonts render correctly
- [ ] Colors match design
- [ ] Spacing consistent
- [ ] Badges readable
- [ ] Overlays not covering important info
- [ ] Smooth transitions

---

## ✅ Success Criteria

**All tests pass if:**
1. All templates display with complete information
2. No console errors
3. Editor loads templates correctly
4. Properties preserved after save/load
5. Error handling works gracefully
6. Performance is smooth
7. All debugging tools work

**Status**: Ready for production when all boxes checked! ✓
