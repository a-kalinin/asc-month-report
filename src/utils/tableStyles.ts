import { Styles } from 'jspdf-autotable';


const headerStyles: Partial<Styles> = {
  fontStyle: 'bold',
  textColor: '#000000',
  fillColor: '#e9ffff',
  valign: 'middle',
  halign: 'left',
  lineWidth: {
    top: 0,
    left: 0,
    right: 0,
  },
};


const styles: Record<
  'header'
  | 'footer'
  | 'personal'
  | 'emptyRight'
  , Partial<Styles>
> = {
  header: headerStyles,
  footer: {
    ...headerStyles,
    lineWidth: {
      top: 0.25,
      left: 0,
      right: 0,
    },
  },
  personal: {
    fontSize: 10,
    textColor: '#000000',
    halign: 'right',
    fontStyle: 'bold',
    lineWidth: 0,
  },
  emptyRight: {
    lineWidth: {
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
};

export default styles;
