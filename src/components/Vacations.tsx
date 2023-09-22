import { Card } from '@mantine/core';
import React from 'react';

import { useFormContext } from '../context/FormContext';
import VacationItem from './VacationItem';

export default function Vacations() {
  const form = useFormContext();

  return (
    <Card data-testid="Vacations">
      {form.values.vacations.map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <VacationItem key={i} index={i} />
      ))}
    </Card>
  );
}
