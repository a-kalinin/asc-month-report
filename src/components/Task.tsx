import {
  Box,
  CloseButton, Divider,
  Flex,
  Grid, Text, Textarea, TextInput,
} from '@mantine/core';

import { useFormContext } from '../context/FormContext';
import { generateTask } from '../utils/generators';

type PropsT = {
  index: number,
  project: number,
};

export default function Task({
  index,
  project,
}: PropsT) {
  const form = useFormContext();

  const daysFieldPath = `projects.${project}.tasks.${index}.days`;
  const hoursFieldPath = `projects.${project}.tasks.${index}.hours`;
  const daysProps = form?.getInputProps(daysFieldPath);
  const hoursProps = form?.getInputProps(hoursFieldPath);

  const onDaysChange = (e: { target: { value: string; }; }) => {
    const daysNum = Number(e.target.value) || 0;
    form.setFieldValue(daysFieldPath, e.target.value);
    form.setFieldValue(hoursFieldPath, daysNum * 8);
  };
  const onHoursChange = (e: { target: { value: string; }; }) => {
    const hoursNum = Number(e.target.value) || 0;
    form.setFieldValue(daysFieldPath, hoursNum / 8);
    form.setFieldValue(hoursFieldPath, e.target.value);
  };

  return (
    <Box mt="lg">
      {index > 0 && <Divider mb="xs" />}
      <Flex data-testid="Task" gap="sm">
        <Text>
          {index + 1}.
        </Text>
        <Grid gutter="sm">
          <Grid.Col xs={6}>
            <Grid gutter="sm">
              <Grid.Col xs={12}>
                <TextInput
                  label="Задача"
                  placeholder="Введите задачу или мероприятие"
                  required
                  {...form?.getInputProps(`projects.${project}.tasks.${index}.name`)}
                />
              </Grid.Col>

              <Grid.Col xs={6} sm={6}>
                <TextInput
                  label="Количество дней"
                  {...daysProps}
                  onChange={onDaysChange}
                />
              </Grid.Col>

              <Grid.Col xs={6}>
                <TextInput
                  label="Количество часов"
                  required
                  {...hoursProps}
                  onChange={onHoursChange}
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>

          <Grid.Col xs={6}>
            <Textarea
              label="Примечания"
              {...form?.getInputProps(`projects.${project}.tasks.${index}.comment`)}
            />
          </Grid.Col>
        </Grid>
        <CloseButton
          onClick={() => {
            const newTasks = form.values.projects[project].tasks.filter((_, i) => i !== index);
            if (!newTasks.length) {
              newTasks.push(generateTask());
            }
            console.log('tasks', form.values.projects[project].tasks);
            console.log('newTasks', newTasks);
            form.setFieldValue(`projects.${project}.tasks`, newTasks);
          }}
        />
      </Flex>
    </Box>
  );
}
