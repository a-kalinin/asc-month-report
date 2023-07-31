import dayjs from 'dayjs';

import { ProjectT } from '../@types/form';

export const generateFileName = (
  name: string,
  date: Date,
) => (
  `${dayjs(date).format('YYYY-MM')} Отчет по работе - ${name}.pdf`
);

export function countProjectHours(project: ProjectT): number {
  return project.tasks
    .reduce((acc, el) => (acc + (Number(el.hours) || 0)), 0);
}

export function countTotalHours(projects: ProjectT[]): number {
  return projects.reduce((acc, el) => (acc + countProjectHours(el)), 0);
}
