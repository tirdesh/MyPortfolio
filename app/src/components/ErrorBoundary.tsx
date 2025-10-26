import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[calc(100vh-12rem)] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4">
          <Card className="bg-white dark:bg-gray-800 shadow-lg max-w-2xl">
            <CardContent className="p-8 text-center">
              <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-4">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {this.state.error?.message || "An unexpected error occurred"}
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={this.handleReload}
                  className="bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
                >
                  Reload Page
                </Button>
                <Button
                  onClick={() => (window.location.href = "/")}
                  variant="outline"
                >
                  Go Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
