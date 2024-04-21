import { filterValue } from '../utils/types';

const BASE_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

export async function fetchEmployees(
  filterText: string | undefined,
  filterValue: filterValue | undefined = undefined
) {
  let url = `${BASE_URL}/employees`;
  if (filterText) url = url + '?search=' + filterText;
  if (filterValue)
    url = url + '?' + filterValue.filter + '=' + filterValue.value;
  console.log(url);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      mode: 'cors',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch employees');
  return await response.json();
}
