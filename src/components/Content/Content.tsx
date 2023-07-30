import { Container } from '@mantine/core';
import React from 'react';

import ReportForm from '../ReportForm/ReportForm';

export default function Content() {
  return (
    <Container data-testid="Content">
      <ReportForm />
    </Container>
  );
}
