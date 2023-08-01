import { Styles } from 'jspdf-autotable';

const styles: Record<'footer' | 'personal', Partial<Styles>> = {
  footer: {
    fontStyle: 'bold',
    textColor: '#000000',
    fillColor: '#e9ffff',
    valign: 'middle',
    halign: 'left',
    lineWidth: {
      bottom: 0,
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
};

export default styles;
