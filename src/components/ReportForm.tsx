import {
  Box,
  Button, Card, Flex, Grid, TextInput, Title,
} from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import React from 'react';

import { useFormContext } from '../context/FormContext';
import { generateProject } from '../utils/generators';
import Project from './Project';
// import createPdf from '../../utils/pdf';

export default function ReportForm() {
  const form = useFormContext();
  return (
    <Box
      component="form"
      w="100%"
      data-testid="ReportForm"
      // onSubmit={form?.onSubmit((values) => createPdf(values))}
      onSubmit={form?.onSubmit((values) => console.info(values))}
    >
      <Title order={3} mb="xs">
        Данные для отчета
      </Title>
      <Flex
        direction="column"
        gap="md"
      >
        <Card>
          <Grid gutter="sm">

            <Grid.Col xs={6}>
              <MonthPickerInput
                label="Месяц/Год"
                placeholder="Выберите месяц"
                required
                {...form?.getInputProps('month')}
              />
            </Grid.Col>
          </Grid>

          <Grid gutter="sm">
            <Grid.Col sm={6}>
              <TextInput
                label="ФИО"
                required
                {...form?.getInputProps('name')}
              />
            </Grid.Col>

            <Grid.Col sm={6}>
              <TextInput
                label="Должность"
                required
                {...form?.getInputProps('position')}
              />
            </Grid.Col>
          </Grid>
        </Card>

        <Title order={5}>Работы</Title>
        {form.values.projects.map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Project key={index} index={index} />
        ))}
        <Flex gap="sm">
          <Button
            ml="auto"
            variant="light"
            onClick={() => {
              form.setFieldValue('projects', [
                ...form.values.projects,
                generateProject(),
              ]);
            }}
          >
            Добавить проект
          </Button>
        </Flex>

        <Box ta="center">
          <Button type="submit" size="lg" mt="sm">
            Сформировать отчет
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
