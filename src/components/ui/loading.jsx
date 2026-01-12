// Loading Spinner Component
export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4',
  }

  return (
    <div
      className={`animate-spin rounded-full border-violet-600 border-t-transparent ${sizeClasses[size]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

// Full Page Loading Component
export function PageLoader({ message = 'Loading...' }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <div className="text-center">
        <LoadingSpinner size="xl" className="mx-auto mb-4" />
        <p className="text-gray-700 text-lg font-medium">{message}</p>
      </div>
    </div>
  )
}

// Inline Loading Component
export function InlineLoader({ message = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center gap-3 py-8">
      <LoadingSpinner size="md" />
      <span className="text-gray-600">{message}</span>
    </div>
  )
}

// Button Loading State
export function ButtonLoader() {
  return (
    <LoadingSpinner size="sm" className="inline-block mr-2" />
  )
}
