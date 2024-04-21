import { Table } from '@nextui-org/react';

import { useEffect } from 'react';
import { useStore } from '../zustand/store';
import { Employee } from '../utils/types';
import { fetchEmployees } from '../services/api-service';

export default function EmployeePage() {
  // ZUSTAND:
  const { setAllEmployees } = useStore();
  const allEmployees = useStore((state) => state.allEmployees);

  // USE EFFECT:
  useEffect(() => {
    async function fetchAllEmployees() {
      const res = await fetchEmployees();
      setAllEmployees(res as Employee[]);
    }
    fetchAllEmployees();
  }, []);

  return (
    <div className="flex flex-col p-10 gap-10">
      <div className="flex flex-row w-full justify-between">
        <h1>Employees</h1>
        <p>Search</p>
      </div>
      {/* <div>
        {allEmployees.map((employee) => (
          <p key={employee.id}>{employee.firstName}</p>
        ))}
      </div> */}
    </div>
  );
}
