import { format } from 'date-fns';

export default function Date({ date }) {
  return <p>{format(date, 'MMMM dd, yyyy')}</p>;
}
