import { Box, Container, Flex } from '@mantine/core';
import React from 'react';

import { ErrorBoundary } from './ErrorBoundary';
import ReportForm from './ReportForm';

export default function Content() {
  return (
    <Flex
      data-testid="Content"
      direction="column"
      sx={{
        minHeight: '100%',
        flexGrow: 1,
      }}
    >
      <Container p={0}>
        <ErrorBoundary>
          <ReportForm />
        </ErrorBoundary>
      </Container>
      <Box sx={{ textAlign: 'end', marginTop: 'auto' }}>
        @Alexandr Kalinin
      </Box>
    </Flex>

  );
}
