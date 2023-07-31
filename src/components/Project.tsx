import {
  Autocomplete,
  Button, Card, CloseButton, Flex, MediaQuery, Title,
} from '@mantine/core';
import React from 'react';

import { useFormContext } from '../context/FormContext';
import { generateProject, generateTask } from '../utils/generators';
import Task from './Task';

type PropsT = {
  index: number,
};

export default function Project({
  index,
}: PropsT) {
  const form = useFormContext();
  const removeProject = () => {
    const newProjects = form.values.projects.filter((_, i) => i !== index);
    if (!newProjects.length) {
      newProjects.push(generateProject());
    }
    form.setFieldValue('projects', newProjects);
  };

  return (
    <Card data-testid="Project">
      <Flex gap="md" align="flex-end">
        <Autocomplete
          data={form.values.projectsList}
          label="Проект/задача"
          placeholder="Введите имя проекта или задачу"
          required
          sx={{ flexGrow: 1 }}
          {...form?.getInputProps(`projects.${index}.name`)}
        />
        <MediaQuery styles={{ display: 'none' }} smallerThan="sm">
          <Button onClick={removeProject} variant="light" color="gray">Удалить проект</Button>
        </MediaQuery>
        <MediaQuery styles={{ display: 'none' }} largerThan="sm">
          <CloseButton
            onClick={removeProject}
            variant="light"
            size="lg"
            mb="2px"
          />
        </MediaQuery>
      </Flex>
      <Title order={5} mt="md">Задачи/Мероприятия</Title>
      {form.values.projects[index].tasks.map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Task key={i} index={i} project={index} />
      ))}
      <Flex gap="sm" mt="xl">
        <Button
          ml="auto"
          variant="light"
          onClick={() => {
            form.setFieldValue(`projects.${index}.tasks`, [
              ...form.values.projects[index].tasks,
              generateTask(),
            ]);
          }}
        >
          Добавить задачу
        </Button>
      </Flex>
    </Card>
  );
}
