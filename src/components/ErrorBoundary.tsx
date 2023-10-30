import { Box, Text } from '@mantine/core';
import React, {
  Component, ErrorInfo, FunctionComponent, ReactElement, ReactNode,
} from 'react';

export interface ErrorBoundaryProps {
  children?: ReactNode,
  force?: boolean,
  fallback?: ReactElement<unknown, string | FunctionComponent | typeof Component> | null;
  onError?: (error: Error, info: ErrorInfo) => void,
}

type StateT = {
  hasError: boolean,
  error: Error | null,
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, StateT> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onError } = this.props;

    console.error(error);
    console.info(errorInfo);
    if (onError) {
      onError(error, errorInfo);
    }
  }

  render() {
    const { children, fallback, force } = this.props;
    const { hasError, error } = this.state;

    if (hasError || force) {
      return fallback
        ?? (
          <Box p="xl">
            <Text color="pink.9" fz="xl">
              Что-то пошло не так
            </Text>
            {error && (
              <Text color="gray.6" fz="sm">
                <pre>{error.stack}</pre>
              </Text>
            )}
          </Box>
        );
    }

    return children;
  }
}
