import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error and stack trace
    console.error("Error caught in ErrorBoundary:", error);
    console.error("Error Info:", errorInfo.componentStack);
    this.setState({ error, errorInfo });

    // Optionally send error details to a logging service
    if (this.props.logError) {
      this.props.logError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
