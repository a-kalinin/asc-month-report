import { createFormContext } from '@mantine/form';
import { useLocalStorage, usePrevious } from '@mantine/hooks';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';

import { FormValuesT } from '../@types/form';

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
  const [savedProject, setSavedProject] = useLocalStorage({
    key: 'report/project',
    getInitialValueInEffect: false,
    defaultValue: '',
  });
  const [savedTask, setSavedTask] = useLocalStorage({
    key: 'report/task',
    getInitialValueInEffect: false,
    defaultValue: '',
  });
  const [savedPosition, setSavedPosition] = useLocalStorage({
    key: 'report/position',
    getInitialValueInEffect: false,
    defaultValue: '',
  });
  const form = useForm({
    initialValues: {
      month: new Date(dayjs().startOf('month').valueOf()),
      start: new Date(dayjs().startOf('month').valueOf()),
      end: new Date(dayjs().endOf('month').valueOf()),
      project: savedProject,
      task: savedTask,
      days: '',
      hours: '',
      comment: '',
      name: savedName,
      position: savedPosition,
    },
    validate: {
      // start: (/* value, values */) => 'Error',
      // end: (/* value, values */) => null,
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
    if (prevValues?.project !== form.values.project) {
      setSavedProject(form.values.project);
    }
    if (prevValues?.task !== form.values.task) {
      setSavedTask(form.values.task);
    }
    if (prevValues?.position !== form.values.position) {
      setSavedPosition(form.values.position);
    }
    if (
      prevValues?.days !== form.values.days
      && prevValues?.hours === form.values.hours
    ) {
      form.setValues({
        hours: form.values.days && String(Number(form.values.days) * 8),
      });
    }
    if (
      prevValues?.hours !== form.values.hours
      && prevValues?.days === form.values.days
    ) {
      form.setValues({
        days: form.values.hours && String(Number(form.values.hours) / 8 || ''),
      });
    }
  }, [prevValues, form, setSavedName, setSavedProject, setSavedTask, setSavedPosition]);

  return (
    <FormProvider form={form}>
      {children}
    </FormProvider>
  );
}
