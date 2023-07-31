import {
  Button, Drawer, Flex, Title,
} from '@mantine/core';
import { ReactNode } from 'react';

import { useFormContext } from '../context/FormContext';
import Badges from './Badges';

type PropsT = {
  opened: boolean,
  onClose: () => void,
  title?: ReactNode,
};

export default function Settings({
  opened,
  onClose,
  title,
}: PropsT) {
  const form = useFormContext();

  const cleanProjects = () => form.setFieldValue('projectsList', []);
  const removeProject = (project: string) => form.setFieldValue(
    'projectsList',
    form.values.projectsList.filter((el) => el !== project),
  );
  const cleanTasks = () => form.setFieldValue('tasksList', []);
  const removeTask = (task: string) => form.setFieldValue(
    'tasksList',
    form.values.tasksList.filter((el) => el !== task),
  );

  return (
    <Drawer
      data-testid="Settings"
      opened={opened}
      title={title}
      onClose={onClose}
      position="right"
    >
      <Title order={3} mb="lg">Сохраненные значения</Title>
      <Flex align="center">
        <Title order={4}>Проекты - {form.values.projectsList.length} шт.</Title>
        <Button variant="light" onClick={cleanProjects} ml="auto">
          Очистить список
        </Button>
      </Flex>
      <Badges values={form.values.projectsList} onBadgeClose={removeProject} />

      <Flex align="center" mt="lg">
        <Title order={4}>Задачи - {form.values.tasksList.length} шт.</Title>
        <Button variant="light" onClick={cleanTasks} ml="auto">
          Очистить список
        </Button>
      </Flex>
      <Badges values={form.values.tasksList} onBadgeClose={removeTask} />
    </Drawer>
  );
}
