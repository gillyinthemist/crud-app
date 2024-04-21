const BASE_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

export async function fetchEmployees() {
  const response = await fetch(`${BASE_URL}/employees`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      mode: 'cors',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch employees');
  return await response.json();
}
