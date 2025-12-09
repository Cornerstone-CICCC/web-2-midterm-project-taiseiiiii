import { Component, ReactNode, ErrorInfo } from 'react';
import styles from './ErrorBoundary.module.scss';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={styles.errorContainer}>
          <div className={styles.errorContent}>
            <h1>Sorry</h1>
            <p>Unexpected Error occured</p>
            {import.meta.env.DEV && this.state.error && (
              <details className={styles.errorDetails}>
                <summary>Error Detail</summary>
                <pre>{this.state.error.toString()}</pre>
                <pre>{this.state.error.stack}</pre>
              </details>
            )}
            <button onClick={this.handleReset} className={styles.resetButton}>
              retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
