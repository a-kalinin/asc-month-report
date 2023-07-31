import { ProjectT, TaskT } from '../@types/form';

export function generateTask(): TaskT {
  return {
    name: '',
    days: '',
    hours: '',
    comment: '',
  };
}

export function generateProject(): ProjectT {
  return {
    name: '',
    tasks: [generateTask()],
  };
}
