// Analytics service for tracking user behavior
import { config, shouldInitAnalytics } from '../config/env'

class AnalyticsService {
  constructor() {
    this.initialized = false
  }

  // Initialize analytics (Google Analytics or Plausible)
  init() {
    if (!shouldInitAnalytics()) {
      console.info('Analytics disabled')
      return
    }

    try {
      // Google Analytics 4
      if (config.analytics.gaId) {
        this.initGoogleAnalytics()
      }

      // Plausible Analytics
      if (config.analytics.plausibleDomain) {
        this.initPlausible()
      }

      this.initialized = true
      console.info('Analytics initialized')
    } catch (error) {
      console.error('Failed to initialize analytics:', error)
    }
  }

  // Initialize Google Analytics 4
  initGoogleAnalytics() {
    // Load GA4 script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.analytics.gaId}`
    document.head.appendChild(script)

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag = gtag
    gtag('js', new Date())
    gtag('config', config.analytics.gaId, {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure',
    })
  }

  // Initialize Plausible Analytics
  initPlausible() {
    const script = document.createElement('script')
    script.defer = true
    script.src = 'https://plausible.io/js/script.js'
    script.setAttribute('data-domain', config.analytics.plausibleDomain)
    document.head.appendChild(script)
  }

  // Track page view
  trackPageView(path) {
    if (!this.initialized) return

    try {
      // Google Analytics
      if (window.gtag && config.analytics.gaId) {
        window.gtag('config', config.analytics.gaId, {
          page_path: path,
        })
      }

      // Plausible (automatic page view tracking)
      if (window.plausible) {
        window.plausible('pageview')
      }
    } catch (error) {
      console.error('Failed to track page view:', error)
    }
  }

  // Track custom event
  trackEvent(eventName, eventParams = {}) {
    if (!this.initialized) return

    try {
      // Google Analytics
      if (window.gtag && config.analytics.gaId) {
        window.gtag('event', eventName, eventParams)
      }

      // Plausible
      if (window.plausible) {
        window.plausible(eventName, { props: eventParams })
      }

      console.info('Event tracked:', eventName, eventParams)
    } catch (error) {
      console.error('Failed to track event:', error)
    }
  }

  // Track user interactions
  trackDesignCreated(templateId) {
    this.trackEvent('design_created', { template_id: templateId })
  }

  trackDesignExported(format, quality) {
    this.trackEvent('design_exported', { format, quality })
  }

  trackToolUsed(toolName) {
    this.trackEvent('tool_used', { tool: toolName })
  }

  trackElementAdded(elementType) {
    this.trackEvent('element_added', { element_type: elementType })
  }

  trackImageUploaded(method) {
    this.trackEvent('image_uploaded', { upload_method: method })
  }

  trackError(errorType, errorMessage) {
    this.trackEvent('error_occurred', { error_type: errorType, error_message: errorMessage })
  }
}

// Export singleton instance
export const analytics = new AnalyticsService()

// React hook for analytics
export const useAnalytics = () => {
  return {
    trackPageView: (path) => analytics.trackPageView(path),
    trackEvent: (name, params) => analytics.trackEvent(name, params),
    trackDesignCreated: (templateId) => analytics.trackDesignCreated(templateId),
    trackDesignExported: (format, quality) => analytics.trackDesignExported(format, quality),
    trackToolUsed: (toolName) => analytics.trackToolUsed(toolName),
    trackElementAdded: (type) => analytics.trackElementAdded(type),
    trackImageUploaded: (method) => analytics.trackImageUploaded(method),
  }
}

export default analytics
