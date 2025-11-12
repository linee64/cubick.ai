import React from "react";

type ErrorBoundaryProps = { children: React.ReactNode };

type ErrorBoundaryState = { hasError: boolean; error?: Error };

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mx-auto p-4">
          <div className="rounded-lg border bg-muted p-6">
            <h2 className="font-semibold mb-2">Произошла ошибка</h2>
            <p className="text-sm text-muted-foreground">
              {this.state.error?.message ?? "Неизвестная ошибка"}
            </p>
            <button
              className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-primary-foreground text-sm"
              onClick={this.handleReset}
            >
              Перезагрузить
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;