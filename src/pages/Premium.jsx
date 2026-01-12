import React from 'react'
import { Navigate } from 'react-router-dom'

// Premium features are included in the free plan
// Redirect to pricing page to show that everything is free
const Premium = () => {
  return <Navigate to="/pricing" replace />
}

export default Premium