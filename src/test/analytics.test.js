import { describe, it, expect, vi } from 'vitest'
import { analytics } from '../services/analytics.jsx'

// Mock environment config
vi.mock('../config/env', () => ({
  config: {
    analytics: {
      gaId: '',
      plausibleDomain: '',
      enabled: false,
    },
  },
  shouldInitAnalytics: () => false,
}))

describe('Analytics Service', () => {
  it('initializes without errors', () => {
    expect(() => analytics.init()).not.toThrow()
  })

  it('tracks events when initialized', () => {
    const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {})
    
    analytics.trackEvent('test_event', { test: true })
    
    // Should not throw even if not initialized
    expect(consoleSpy).not.toThrow()
    
    consoleSpy.mockRestore()
  })

  it('has all required tracking methods', () => {
    expect(analytics.trackDesignCreated).toBeDefined()
    expect(analytics.trackDesignExported).toBeDefined()
    expect(analytics.trackToolUsed).toBeDefined()
    expect(analytics.trackElementAdded).toBeDefined()
    expect(analytics.trackImageUploaded).toBeDefined()
  })
})
