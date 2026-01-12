// PWA Service Worker Registration
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.info('Service Worker registered:', registration.scope)

          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker available, notify user
                if (confirm('New version available! Reload to update?')) {
                  newWorker.postMessage({ type: 'SKIP_WAITING' })
                  window.location.reload()
                }
              }
            })
          })
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error)
        })

      // Reload page when new service worker takes control
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload()
      })
    })
  }
}

export const unregisterServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister()
      })
      .catch((error) => {
        console.error('Service Worker unregistration failed:', error)
      })
  }
}

// Check if app is running in standalone mode (PWA installed)
export const isStandalone = () => {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone ||
    document.referrer.includes('android-app://')
  )
}

// Prompt user to install PWA
export const promptInstall = () => {
  let deferredPrompt = null

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    
    // Show install button
    console.info('PWA install prompt available')
    
    // You can show a custom install button here
    return deferredPrompt
  })

  return {
    showInstallPrompt: async () => {
      if (!deferredPrompt) {
        console.info('Install prompt not available')
        return false
      }

      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      console.info('Install prompt outcome:', outcome)
      
      deferredPrompt = null
      return outcome === 'accepted'
    },
  }
}
