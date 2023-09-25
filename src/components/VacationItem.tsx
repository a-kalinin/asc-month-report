import {
  Box,
  CloseButton, Divider,
  Flex,
  Grid, Text, TextInput,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import dayjs from 'dayjs';

import { useFormContext } from '../context/FormContext';

type PropsT = {
  index: number,

};

export default function VacationItem({
  index,
}: PropsT) {
  const form = useFormContext();

  const fromFieldPath = `vacations.${index}.from`;
  const tillFieldPath = `vacations.${index}.till`;
  const fromProps = form?.getInputProps(fromFieldPath);
  const tillProps = form?.getInputProps(tillFieldPath);

  return (
    <Box mt={index > 0 ? 'lg' : 0} data-testid="VacationItem">
      {index > 0 && <Divider mb="xs" />}
      <Flex data-testid="Task" gap="sm">
        <Text>
          {index + 1}.
        </Text>
        <Grid gutter="sm" sx={{ flex: '1 1 100%' }}>
          <Grid.Col span={6} sm={4}>
            <DatePickerInput
              label="С"
              required
              popoverProps={{ withinPortal: true }}
              firstDayOfWeek={1}
              valueFormat="DD MMM"
              {...fromProps}
            />
          </Grid.Col>

          <Grid.Col span={6} sm={4}>
            <DatePickerInput
              label="По"
              required
              popoverProps={{ withinPortal: true }}
              firstDayOfWeek={1}
              valueFormat="DD MMM"
              {...tillProps}
            />
          </Grid.Col>

          <Grid.Col span={6} sm={4} ml="auto">
            <TextInput
              label="Итого дней"
              variant="filled"
              readOnly
              value={
                fromProps?.value && tillProps?.value
                  ? dayjs(tillProps.value).add(1, 'day').diff(fromProps.value, 'day')
                  : ''
              }
            />
          </Grid.Col>
        </Grid>
        <CloseButton
          onClick={() => {
            const newVacations = form.values.vacations.filter((_, i) => i !== index);
            form.setFieldValue('vacations', newVacations);
          }}
        />
      </Flex>
    </Box>
  );
}
