import { format } from 'date-fns';

export default function Date({ date }) {
  return <span>{format(date, 'MMMM dd, yyyy HH:mm')}</span>;
}
