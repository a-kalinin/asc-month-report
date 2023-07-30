import { Box, Container, Flex } from '@mantine/core';
import React from 'react';

import ReportForm from '../ReportForm/ReportForm';

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
      <Container>
        <ReportForm />
      </Container>
      <Box sx={{ textAlign: 'end', marginTop: 'auto' }}>
        @Alexandr Kalinin
      </Box>
    </Flex>

  );
}
