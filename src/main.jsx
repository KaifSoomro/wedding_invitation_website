import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { analytics } from './services/analytics.jsx'
import { errorTracking } from './services/errorTracking.jsx'
import { registerServiceWorker } from './utils/pwa'

// Initialize analytics and error tracking
analytics.init()
errorTracking.init()

// Register service worker for PWA support
if (import.meta.env.PROD) {
  registerServiceWorker()
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </StrictMode>,
)
