import {
  Button, Card, Divider, Grid, Textarea, TextInput, Title,
} from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import React from 'react';

import { useFormContext } from '../../context/FormContext';
import { createPdf } from '../../utils/pdf';

export default function ReportForm() {
  const form = useFormContext();
  return (
    <Card data-testid="ReportForm">
      <form onSubmit={form?.onSubmit((values) => createPdf(values))}>
        <Title order={4} mb="xs">
          Данные для отчета
        </Title>
        <Divider />

        <Grid gutter="sm" mt="sm">

          <Grid.Col xs={6}>
            <MonthPickerInput
              label="Месяц/Год"
              placeholder="Выберите месяц"
              required
              {...form?.getInputProps('month')}
            />
          </Grid.Col>

          <Grid.Col xs={6}>
            <TextInput
              label="Проект/задача"
              placeholder="Введите имя проекта или задачу"
              required
              {...form?.getInputProps('project')}
            />
          </Grid.Col>

          <Grid.Col xs={6}>
            <Textarea
              label="Задачи/Мероприятия"
              placeholder="Введите задачу или мероприятие"
              required
              {...form?.getInputProps('task')}
            />
          </Grid.Col>

          <Grid.Col xs={6}>
            <Textarea
              label="Примечания"
              {...form?.getInputProps('comment')}
            />
          </Grid.Col>

          <Grid.Col sm={12}>
            <Title order={5}>Затраченное время</Title>
          </Grid.Col>

          <Grid.Col xs={6} sm={3}>
            <TextInput
              label="Количество дней"
              {...form?.getInputProps('days')}
            />
          </Grid.Col>

          <Grid.Col xs={6} sm={3}>
            <TextInput
              label="Количество часов"
              required
              {...form?.getInputProps('hours')}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Title order={5}>Сотрудник</Title>
          </Grid.Col>

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

          <Grid.Col ta="center">
            <Button type="submit">Сформировать</Button>
          </Grid.Col>
        </Grid>
      </form>
    </Card>
  );
}
