export type FormValuesT = {
  month: Date | null,
  start: Date | null,
  end: Date | null,
  projects: ProjectT[]
  name: string,
  position: string,
  totalHours: number,
  projectsList: string[],
  tasksList: string[],
  vacations: VacationT[]
};

export type VacationT = {
  from: Date | null,
  till: Date | null,
};

export type ProjectT = {
  name: string,
  tasks: TaskT[],
};

export type TaskT = {
  name: string,
  days: string,
  hours: string,
  comment: string,
};
