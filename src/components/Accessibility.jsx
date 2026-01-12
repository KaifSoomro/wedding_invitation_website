// Skip to content link for keyboard navigation
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-violet-600 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
    >
      Skip to main content
    </a>
  )
}

// Screen reader only text component
export function ScreenReaderOnly({ children }) {
  return <span className="sr-only">{children}</span>
}

// Accessible icon button
export function IconButton({ 
  icon: Icon, 
  label, 
  onClick, 
  className = '',
  variant = 'default',
  disabled = false,
  ...props 
}) {
  const variantClasses = {
    default: 'hover:bg-gray-100',
    primary: 'hover:bg-violet-100 text-violet-600',
    danger: 'hover:bg-red-100 text-red-600',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        p-2 rounded-md transition-colors
        ${variantClasses[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      aria-label={label}
      {...props}
    >
      <Icon className="w-5 h-5" aria-hidden="true" />
      <ScreenReaderOnly>{label}</ScreenReaderOnly>
    </button>
  )
}

// Live region for dynamic content announcements
export function LiveRegion({ children, role = 'status', ariaLive = 'polite' }) {
  return (
    <div
      role={role}
      aria-live={ariaLive}
      aria-atomic="true"
      className="sr-only"
    >
      {children}
    </div>
  )
}

// Focus trap for modals
export function FocusTrap({ children, active = true }) {
  if (!active) return children

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === 'Tab') {
          const focusableElements = e.currentTarget.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
          const firstElement = focusableElements[0]
          const lastElement = focusableElements[focusableElements.length - 1]

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }}
    >
      {children}
    </div>
  )
}

// Accessible form field
export function AccessibleField({ 
  id, 
  label, 
  error, 
  hint, 
  required = false, 
  children 
}) {
  const errorId = error ? `${id}-error` : undefined
  const hintId = hint ? `${id}-hint` : undefined

  return (
    <div className="space-y-2">
      <label 
        htmlFor={id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
      
      {hint && (
        <p id={hintId} className="text-sm text-gray-600">
          {hint}
        </p>
      )}
      
      {children}
      
      {error && (
        <p id={errorId} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

// Keyboard navigation helper
export function useKeyboardNavigation(items, onSelect) {
  const handleKeyDown = (e, index) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        const nextIndex = (index + 1) % items.length
        document.getElementById(`item-${nextIndex}`)?.focus()
        break
      case 'ArrowUp':
        e.preventDefault()
        const prevIndex = (index - 1 + items.length) % items.length
        document.getElementById(`item-${prevIndex}`)?.focus()
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        onSelect(items[index])
        break
      case 'Home':
        e.preventDefault()
        document.getElementById('item-0')?.focus()
        break
      case 'End':
        e.preventDefault()
        document.getElementById(`item-${items.length - 1}`)?.focus()
        break
    }
  }

  return { handleKeyDown }
}
