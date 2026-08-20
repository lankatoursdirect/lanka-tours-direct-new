import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-[80vh] items-center justify-center bg-[var(--cream-parchment)]">
          <div className="flex flex-col items-center gap-4 px-6 text-center">
            <h2 className="text-2xl font-display text-[var(--jungle-deep)]">
              Something went wrong
            </h2>
            <p className="max-w-md text-muted-foreground">
              We're sorry for the inconvenience. Please try again.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
              }}
              className="rounded-lg bg-[var(--ceylon-gold)] px-8 py-3 font-accent text-xs uppercase tracking-widest text-white shadow-gold transition-all hover:scale-105"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
