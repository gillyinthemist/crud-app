import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';

import { useEffect } from 'react';
import { useStore } from '../zustand/store';
import { Employee } from '../utils/types';
import { fetchEmployees } from '../services/api-service';

const columns = [
  {
    key: 'id',
    label: 'Employee ID',
  },
  {
    key: 'firstName',
    label: 'First Name',
  },
  {
    key: 'lastName',
    label: 'Last Name',
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'position',
    label: 'Position',
  },
  {
    key: 'salary',
    label: 'Salary',
  },
  {
    key: 'department',
    label: 'Department',
  },
];

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
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={allEmployees}>
          {(employee) => (
            <TableRow key={employee.id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(employee, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
