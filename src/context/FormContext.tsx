import { createFormContext } from '@mantine/form';
import { useLocalStorage, usePrevious } from '@mantine/hooks';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';

import { FormValuesT, ProjectT, VacationT } from '../@types/form';
import { generateProject } from '../utils/generators';
import { countTotalHours } from '../utils/various';

type PropsT = {
  children?: React.ReactNode,
};

const [FormProvider, useFormContext, useForm] = createFormContext<FormValuesT>();

export {
  useFormContext,
};

export default function FormContextProvider({
  children,
}: PropsT) {
  const [savedName, setSavedName] = useLocalStorage({
    key: 'report/name',
    getInitialValueInEffect: false,
    defaultValue: '',
  });
  const [savedProjects, setSavedProjects] = useLocalStorage<ProjectT[]>({
    key: 'report/projects',
    getInitialValueInEffect: false,
    defaultValue: [generateProject()],
  });
  const [savedPosition, setSavedPosition] = useLocalStorage({
    key: 'report/position',
    getInitialValueInEffect: false,
    defaultValue: '',
  });
  const [projectsList, setProjectsList] = useLocalStorage<string[]>({
    key: 'report/projectsList',
    getInitialValueInEffect: false,
    defaultValue: [],
  });
  const [tasksList, setTasksList] = useLocalStorage<string[]>({
    key: 'report/tasksList',
    getInitialValueInEffect: false,
    defaultValue: [],
  });
  const [vacations, setVacationsList] = useLocalStorage<VacationT[]>({
    key: 'report/vacations',
    getInitialValueInEffect: false,
    defaultValue: [],
    deserialize(value: string): VacationT[] {
      const values = JSON.parse(value);
      return values.map((el: VacationT) => ({
        from: el.from ? new Date(el.from) : null,
        till: el.till ? new Date(el.till) : null,
      }));
    },
  });
  const form = useForm({
    initialValues: {
      month: new Date(dayjs().startOf('month').valueOf()),
      start: new Date(dayjs().startOf('month').valueOf()),
      end: new Date(dayjs().endOf('month').valueOf()),
      projects: savedProjects,
      name: savedName,
      position: savedPosition,
      totalHours: 0,
      projectsList,
      tasksList,
      vacations,
    },
    validate: {
      // start: (/* value, values */) => 'Error',
      // end: (/* value, values */) => null,
      projects: {
        tasks: {
          hours: (value) => {
            const val = Number(value);
            if (Number.isNaN(val) || val === 0) {
              return 'Количество часов не верно';
            }
            return null;
          },
        },
      },
      vacations: (value) => {
        if (
          value.some((el) => !el.from || !el.till || el.from > el.till)
        ) {
          return 'Неправильные даты отпуска';
        }
        return null;
      },
    },
  });
  const prevValues = usePrevious(form.values);

  useEffect(() => {
    if (prevValues?.month !== form.values.month) {
      form.setValues({
        start: new Date(dayjs(form.values.month).startOf('month').valueOf()),
        end: new Date(dayjs(form.values.month).endOf('month').valueOf()),
      });
    }
    if (prevValues?.name !== form.values.name) {
      setSavedName(form.values.name);
    }
    if (prevValues?.position !== form.values.position) {
      setSavedPosition(form.values.position);
    }
    if (prevValues?.projects !== form.values.projects) {
      setSavedProjects(form.values.projects);
      form.setValues({ totalHours: countTotalHours(form.values.projects) });
    }
    if (prevValues?.projectsList !== form.values.projectsList) {
      setProjectsList(form.values.projectsList);
    }
    if (prevValues?.tasksList !== form.values.tasksList) {
      setTasksList(form.values.tasksList);
    }
    if (prevValues?.vacations !== form.values.vacations) {
      setVacationsList(form.values.vacations);
    }
  }, [
    prevValues, form, setSavedName, setSavedPosition,
    setSavedProjects, setProjectsList, setTasksList, setVacationsList,
  ]);

  return (
    <FormProvider form={form}>
      {children}
    </FormProvider>
  );
}
