import { ProjectT, TaskT, VacationT } from '../@types/form';

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

export function generateVacation(): VacationT {
  return {
    from: null,
    till: null,
  };
}
