import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
    expect(screen.getByText(/wedding/i)).toBeInTheDocument()
  })

  it('has create design button', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
    const createButton = screen.getByRole('link', { name: /create/i })
    expect(createButton).toBeInTheDocument()
  })
})
