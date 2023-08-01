import dayjs from 'dayjs';
import Pdf from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';

import { FormValuesT } from '../@types/form';
import styles from './tableStyles';
import { generateFileName } from './various';

import './Roboto-Light-normal';
import './Roboto-Medium-bold';


class GenPdf {
  data: FormValuesT;

  doc: Pdf;

  constructor(data: FormValuesT) {
    this.data = data;
    this.doc = new Pdf({ orientation: 'l' });
    this.doc.setFont('Roboto');
  }

  static produceTitle = (month: Date | null): RowInput[] => ([
    [
      {
        content: 'Общество с ограниченной ответственностью «АЛЬМА Сервисез Компани»',
        styles: {
          textColor: '#333333',
          fontSize: 10,
        },
      },
    ],
    [
      {
        content: 'Отчёт о выполненной работе',
      },
    ],
    [
      {
        content: dayjs(month).format('за MMMM YYYY года.'),
      },
    ],
  ]);

  static produceTableHeader = (): RowInput[] => ([[
    '№ п/п',
    'Дата начала работ',
    'Дата окончания работ',
    'Наименование задачи/проекта',
    'Выполненные работы/мероприятия',
    'Трудозатраты, человеко-часы',
    'Примечания/комментарии',
  ]]);

  static produceTableBody = ({
    start, end, projects,
  }: FormValuesT): RowInput[] => {
    const result = projects
      .flatMap(
        ({ tasks, name: project }) => tasks
          .map(({ hours, comment, name: task }) => ([
            dayjs(start).format('DD.MM.YY'),
            dayjs(end).format('DD.MM.YY'),
            project,
            task,
            hours,
            comment,
          ])),
      )
      .map((el, i) => ([i + 1, ...el]));
    if (result.length < 5) {
      result.push(...(new Array(5 - result.length).fill('')));
    }
    return result;
  };

  static produceTableFooter = ({
    totalHours,
    month,
  }: FormValuesT): RowInput[] => ([
    [
      {
        content: dayjs(month).format('Итого за MMMM YYYY года:'),
        colSpan: 5,
        styles: styles.footer,
      },
      {
        content: totalHours,
        styles: {
          ...styles.footer,
          fontSize: 15,
          halign: 'center',
        },
      },
      {
        content: '',
        styles: styles.footer,
      },
    ],
  ]);

  static produceTablePersonal = ({
    name,
    position,
  }: FormValuesT): RowInput[] => ([
    [{ content: '', styles: styles.personal, colSpan: 7 }],
    [{ content: `ФИО: ${name}`, styles: styles.personal, colSpan: 7 }],
    [{ content: `Должность: ${position}`, styles: styles.personal, colSpan: 7 }],
    [
      { content: '', styles: styles.personal, colSpan: 6 },
      {
        content: '',
        styles: {
          ...styles.personal,
          lineWidth: {
            bottom: 0.5,
          },
          lineColor: '#000000',
          fontSize: 12,
        },
        colSpan: 1,
      },
    ],
    [
      { content: '', styles: styles.personal, colSpan: 6 },
      {
        content: 'Подпись',
        styles: {
          ...styles.personal,
          fontSize: 8,
          fontStyle: 'normal',
          halign: 'center',
          valign: 'top',
        },
        colSpan: 1,
      },
    ],
  ]);

  renderReport = () => {
    autoTable(this.doc, {
      theme: 'plain',
      startY: 0,
      styles: {
        fontSize: 16,
        font: 'Roboto',
        textColor: '#000000',
        fillColor: '#FFFFFF',
        halign: 'center',
        fontStyle: 'bold',
      },
      body: GenPdf.produceTitle(this.data.month),
    });

    autoTable(this.doc, {
      theme: 'grid',
      startY: 30,
      showHead: 'firstPage',
      styles: {
        font: 'Roboto',
      },
      headStyles: {
        fillColor: '#d5fdfd',
        textColor: '#000000',
        fontSize: 8,
        fontStyle: 'bold',
      },
      bodyStyles: {
        fontSize: 9,
        textColor: '#000000',
        halign: 'center',
      },
      footStyles: {
        fontStyle: 'bold',
        textColor: '#000000',
        fillColor: '#e9ffff',
        valign: 'middle',
      },
      head: GenPdf.produceTableHeader(),
      body: [
        ...GenPdf.produceTableBody(this.data),
        ...GenPdf.produceTableFooter(this.data),
        ...GenPdf.produceTablePersonal(this.data),
      ],
    });
  };

  save = () => {
    const { name, month } = this.data;
    if (month) {
      const filename = generateFileName(name, month);
      this.doc.save(filename);
    }
  };
}

export default function createPdf(data: FormValuesT) {
  const pdf = new GenPdf(data);
  pdf.renderReport();
  pdf.save();
}
