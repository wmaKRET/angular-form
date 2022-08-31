import { FormSection } from './models/formSection';

export const SECTIONS: FormSection[] = [
  { id: 1, name: 'definition', isDisabled: false },
  { id: 2, name: 'choose products', isDisabled: true },
  { id: 3, name: 'exclude products', isDisabled: true },
  {
    id: 4,
    name: 'bonus products',
    isDisabled: true,
    tooltip: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
  },
  {
    id: 5,
    name: 'products limits',
    isDisabled: true,
    tooltip: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
  },
  { id: 6, name: 'chooes clients', isDisabled: true },
  { id: 7, name: 'exclude clients', isDisabled: true },
  { id: 8, name: 'clients limits', isDisabled: true },
  { id: 9, name: 'summary', isDisabled: true },
];
