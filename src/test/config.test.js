import { describe, it, expect } from 'vitest'
import { config } from '../config/env'

describe('Environment Configuration', () => {
  it('has required app configuration', () => {
    expect(config.app.name).toBeDefined()
    expect(config.app.version).toBeDefined()
    expect(config.app.url).toBeDefined()
  })

  it('has storage limits configured', () => {
    expect(config.storage.maxImageSize).toBeGreaterThan(0)
    expect(config.storage.maxUploadSize).toBeGreaterThan(0)
  })

  it('has environment flags', () => {
    expect(typeof config.isDevelopment).toBe('boolean')
    expect(typeof config.isProduction).toBe('boolean')
    expect(config.mode).toBeDefined()
  })

  it('has feature flags', () => {
    expect(typeof config.features.cloudSave).toBe('boolean')
    expect(typeof config.features.premium).toBe('boolean')
  })
})
