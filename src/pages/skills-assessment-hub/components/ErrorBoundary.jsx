import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can log the error to an error reporting service here
    console.error('Assessment Hub Error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    // Attempt to recover by resetting the assessment state
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 text-center max-w-2xl mx-auto"
          role="alert"
          aria-live="assertive"
        >
          <Icon 
            name="AlertTriangle" 
            className="w-12 h-12 mx-auto text-red-500 mb-4"
            aria-hidden="true"
          />
          <h2 className="text-2xl font-semibold mb-4">
            Something went wrong
          </h2>
          <p className="text-muted-foreground mb-6">
            We encountered an error while processing your assessment. Please try again or contact support if the problem persists.
          </p>
          <div className="space-x-4">
            <Button
              onClick={this.handleReset}
              aria-label="Try again"
            >
              <Icon name="RefreshCw" className="w-4 h-4 mr-2" aria-hidden="true" />
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              aria-label="Reload page"
            >
              <Icon name="RotateCcw" className="w-4 h-4 mr-2" aria-hidden="true" />
              Reload Page
            </Button>
          </div>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <div className="mt-8 p-4 bg-card rounded-lg text-left overflow-auto">
              <pre className="text-sm">
                {this.state.error.toString()}
              </pre>
            </div>
          )}
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;