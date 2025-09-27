'use client'
import React, { ReactNode } from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * A React component that catches JavaScript errors anywhere in its child component tree.
 *
 * This Error Boundary component logs errors and displays a fallback UI instead of
 * the component tree that crashed. It is designed to be wrapped around major
 * sections of the application to prevent a localized error from crashing the
 * entire app. It provides a "Try Again" button that attempts to re-render the
 * children, which may resolve transient errors.
 */
class ErrorBoundary extends React.Component<Props, State> {
  /**
   * Initializes the state of the component.
   * @param {Props} props - The props for the component.
   */
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  /**
   * Updates state so the next render will show the fallback UI.
   * @param {Error} error - The error that was thrown.
   * @returns {State} The new state to update the component with.
   */
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  /**
   * Catches errors in any components below and logs them.
   * @param {Error} error - The error that was thrown.
   * @param {React.ErrorInfo} errorInfo - An object with a `componentStack` key.
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Application Error:', error, errorInfo)
    // TODO: Log to an error tracking service like Sentry or Bugsnag
  }

  /**
   * Renders the component tree or a fallback UI if an error occurred.
   * @returns {ReactNode} The rendered component.
   */
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen items-center justify-center bg-background">
            <div className="p-8 text-center rounded-lg border max-w-md" data-testid="error-boundary">
                <h2 className="text-2xl font-bold text-destructive">Something went wrong</h2>
                <p className="text-muted-foreground mt-2">The application encountered an unexpected error. Please try again.</p>
                <Button 
                    onClick={() => this.setState({ hasError: false, error: null })}
                    data-testid="error-boundary-retry"
                    className="mt-6"
                >
                    Try Again
                </Button>
            </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
