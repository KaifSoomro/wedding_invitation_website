import React from "react";
import { Button } from "@/components/ui/button";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Editor Error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = "/editor";
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-full flex items-center justify-center bg-neutral-50">
          <div className="max-w-md p-8 bg-white rounded-lg shadow-lg border border-neutral-200">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                  Oops! Something went wrong
                </h2>
                <p className="text-sm text-neutral-600">
                  The editor encountered an unexpected error. Your work is auto-saved.
                </p>
              </div>

              {this.state.error && (
                <details className="text-left">
                  <summary className="text-xs text-neutral-500 cursor-pointer hover:text-neutral-700">
                    View error details
                  </summary>
                  <pre className="mt-2 p-3 bg-neutral-100 rounded text-xs overflow-auto max-h-32">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}

              <div className="flex gap-2 pt-2">
                <Button onClick={this.handleReload} variant="outline" className="flex-1">
                  Reload Page
                </Button>
                <Button onClick={this.handleReset} variant="default" className="flex-1">
                  Reset Editor
                </Button>
              </div>

              <p className="text-xs text-neutral-500">
                If the problem persists, try clearing your browser cache.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
