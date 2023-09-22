import {
  Box,
  Button, Flex, Grid, MediaQuery, Text, TextInput, Title,
} from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import React, { useMemo } from 'react';

import { FormValuesT } from '../@types/form';
import { useFormContext } from '../context/FormContext';
import { generateProject, generateVacation } from '../utils/generators';
import createPdf from '../utils/pdf';
import { countTotalHours } from '../utils/various';
import Project from './Project';
import Settings from './Settings';
import Vacations from './Vacations';

export default function ReportForm() {
  const form = useFormContext();
  const [opened, { open, close }] = useDisclosure(false);

  const onSubmit = (values: FormValuesT) => {
    form.setValues({
      projectsList: Array.from(new Set(
        form.values.projectsList
          .concat(form.values.projects.map((el) => el.name)),
      )),
      tasksList: Array.from(new Set(
        form.values.tasksList.concat(
          form.values.projects.flatMap(
            (el) => el.tasks.map((el2) => el2.name),
          ),
        ),
      )),
    });
    createPdf(values);
  };

  const totalHours = useMemo(
    () => countTotalHours(form.values.projects),
    [form.values.projects],
  );

  return (
    <Box
      component="form"
      w="100%"
      data-testid="ReportForm"
      onSubmit={form?.onSubmit(onSubmit)}
    >
      <Flex align="center">
        <Title order={3} mb="xs">
          Данные для отчета
        </Title>
        <Button ml="auto" variant="light" onClick={open}>
          Настройки
        </Button>
      </Flex>
      <Flex
        direction="column"
        gap="md"
      >
        {/* <Card> */}
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
        {/* </Card> */}

        <Title order={5}>Работы</Title>
        {form.values.projects.map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Project key={index} index={index} />
        ))}
        <Flex gap="sm">
          <MediaQuery styles={(theme) => ({ marginRight: theme.spacing.md })} largerThan="xs">
            <Button
              variant="light"
              mx="auto"
              onClick={() => {
                form.setFieldValue('projects', [
                  ...form.values.projects,
                  generateProject(),
                ]);
              }}
            >
              Добавить проект
            </Button>
          </MediaQuery>
        </Flex>

        {form.values.vacations.length > 0 && (
          <>
            <Title order={5}>Отпуск</Title>
            <Vacations />
          </>
        )}
        <Flex gap="sm">
          <MediaQuery styles={(theme) => ({ marginRight: theme.spacing.md })} largerThan="xs">
            <Button
              variant="light"
              mx="auto"
              onClick={() => {
                form.setFieldValue('vacations', [
                  ...form.values.vacations,
                  generateVacation(),
                ]);
              }}
            >
              Добавить отпуск
            </Button>
          </MediaQuery>
        </Flex>

        {Object.values(form.errors).length > 0 && (
          Object.values(form.errors).map((msg) => (
            <Text color="red">
              - {msg}
            </Text>
          ))
        )}

        <Box ta="center">
          <Button type="submit" size="lg" mt="sm">
            Сформировать отчет ({totalHours} ч.)
          </Button>
        </Box>
      </Flex>
      <Settings opened={opened} onClose={close} title="Настройки" />
    </Box>
  );
}
