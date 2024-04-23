import { Employee, filterValue } from '../utils/types';

const BASE_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

export async function fetchEmployees(
  filterText: string | undefined,
  filterValue: filterValue | undefined = undefined
) {
  let url = `${BASE_URL}/employees`;
  if (filterText) url = url + '?search=' + filterText;
  if (filterValue)
    url = url + '?' + filterValue.filter + '=' + filterValue.value;
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

export async function addEmployee(employee: Employee) {
  const response = await fetch(`${BASE_URL}/employees`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      mode: 'cors',
    },
    body: JSON.stringify(employee),
  });
  if (!response.ok) throw new Error('Failed to add employee');
  return await response.json();
}

export async function updateEmployee(employee: Employee) {
  const response = await fetch(`${BASE_URL}/employees/${employee.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      mode: 'cors',
    },
    body: JSON.stringify(employee),
  });
  if (!response.ok) throw new Error('Failed to update employee');
  return await response.json();
}

export async function deleteEmployee(employeeId: string) {
  const response = await fetch(`${BASE_URL}/employees/${employeeId}`, {
    method: 'DELETE',
    headers: {
      mode: 'cors',
    },
  });
  if (!response.ok) throw new Error('Failed to delete employee');
  return;
}
