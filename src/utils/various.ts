import dayjs from 'dayjs';

export const generateFileName = (
  name: string,
  date: Date,
) => (
  `${dayjs(date).format('YYYY-MM')} Отчет по работе - ${name}.pdf`
);
