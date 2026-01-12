// Error tracking service using Sentry
import { config, shouldInitErrorTracking } from '../config/env'

class ErrorTrackingService {
  constructor() {
    this.initialized = false
    this.Sentry = null
  }

  // Initialize Sentry (call this in main.jsx)
  async init() {
    if (!shouldInitErrorTracking()) {
      console.info('Error tracking disabled')
      return
    }

    try {
      // Try to dynamically import Sentry only if enabled
      // This will fail gracefully if @sentry/react is not installed
      const sentryModule = await import('@sentry/react').catch(() => null)
      
      if (!sentryModule) {
        console.warn('Sentry package not installed. Run: npm install @sentry/react')
        return
      }

      this.Sentry = sentryModule

      sentryModule.init({
        dsn: config.sentry.dsn,
        environment: config.sentry.environment,
        integrations: [
          sentryModule.browserTracingIntegration(),
          sentryModule.replayIntegration({
            maskAllText: false,
            blockAllMedia: false,
          }),
        ],
        // Performance Monitoring
        tracesSampleRate: config.isProduction ? 0.1 : 1.0,
        // Session Replay
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
        // Additional options
        beforeSend(event, hint) {
          // Filter out non-critical errors
          if (event.level === 'log' || event.level === 'info') {
            return null
          }
          return event
        },
      })

      this.initialized = true
      console.info('Error tracking initialized')
    } catch (error) {
      console.warn('Error tracking setup skipped:', error.message)
    }
  }

  // Capture exception
  captureException(error, context = {}) {
    if (!this.initialized || !this.Sentry) {
      console.error('Error:', error, context)
      return
    }

    this.Sentry.captureException(error, {
      contexts: { custom: context },
    })
  }

  // Capture message
  captureMessage(message, level = 'info', context = {}) {
    if (!this.initialized || !this.Sentry) {
      console[level](message, context)
      return
    }

    this.Sentry.captureMessage(message, {
      level,
      contexts: { custom: context },
    })
  }

  // Set user context
  setUser(user) {
    if (!this.initialized || !this.Sentry) return

    this.Sentry.setUser({
      id: user.id,
      email: user.email,
      username: user.username,
    })
  }

  // Add breadcrumb
  addBreadcrumb(breadcrumb) {
    if (!this.initialized || !this.Sentry) return

    this.Sentry.addBreadcrumb({
      message: breadcrumb.message,
      category: breadcrumb.category,
      level: breadcrumb.level || 'info',
      data: breadcrumb.data,
    })
  }

  // Set context
  setContext(name, context) {
    if (!this.initialized || !this.Sentry) return

    this.Sentry.setContext(name, context)
  }

  // Capture editor-specific errors
  captureCanvasError(error, elementType) {
    this.captureException(error, {
      area: 'canvas',
      elementType,
    })
  }

  captureExportError(error, format) {
    this.captureException(error, {
      area: 'export',
      format,
    })
  }

  captureUploadError(error, uploadMethod) {
    this.captureException(error, {
      area: 'upload',
      method: uploadMethod,
    })
  }
}

// Export singleton instance
export const errorTracking = new ErrorTrackingService()

// React error boundary component (if using Sentry)
export const SentryErrorBoundary = ({ children }) => {
  if (!errorTracking.initialized || !errorTracking.Sentry) {
    // Fallback to custom error boundary
    return children
  }

  const { ErrorBoundary } = errorTracking.Sentry
  return (
    <ErrorBoundary
      fallback={({ error, resetError }) => (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
            <p className="text-gray-700 mb-4">{error.message}</p>
            <button
              onClick={resetError}
              className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
            >
              Try again
            </button>
          </div>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  )
}

export default errorTracking
