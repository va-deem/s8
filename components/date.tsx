import { format } from 'date-fns';

export default function Date({ date }) {
  return <>{format(date, 'MMMM dd, yyyy HH:mm')}</>;
}
