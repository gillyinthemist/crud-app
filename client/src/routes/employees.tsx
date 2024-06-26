import {
  Button,
  Card,
  getKeyValue,
  Input,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';

import { Employee } from '../utils/types';
import { deleteEmployee, fetchEmployees } from '../services/api-service';
import { useAsyncList } from '@react-stately/data';
import { useEffect, useState } from 'react';
import { Key } from '@react-types/shared';
import { TrashIcon } from '@heroicons/react/24/outline';
import AddEmployeeModal from '../components/add-employee-modal';
import FilterButtons from '../components/filter-buttons';
import EditEmployeeModal from '../components/edit-employee-modal';

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

const emptyEmployee: Employee = {
  firstName: '',
  lastName: '',
  email: '',
  position: '',
  salary: '',
  department: '',
};

export default function EmployeePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState<
    Iterable<Key> | 'all' | undefined
  >(undefined);

  const list = useAsyncList<Employee>({
    async load({ filterText }) {
      setIsLoading(true);
      const res = await fetchEmployees(filterText);
      setIsLoading(false);
      return {
        items: res,
      };
    },
    initialSortDescriptor: { column: 'id', direction: 'ascending' },
    async sort({ items, sortDescriptor }) {
      return {
        items: (items as Employee[]).sort((a, b) => {
          const first = a[sortDescriptor.column as keyof Employee];
          const second = b[sortDescriptor.column as keyof Employee];

          // Convert both values to string or default to empty string if undefined
          const firstValue = first !== undefined ? String(first) : '';
          const secondValue = second !== undefined ? String(second) : '';

          // Use parseInt, default to 0 if NaN
          const firstNum = parseInt(firstValue) || 0;
          const secondNum = parseInt(secondValue) || 0;

          // Compare numbers or fall back to comparing strings if numbers are the same (and potentially zero)
          let cmp =
            firstNum !== secondNum
              ? firstNum < secondNum
                ? -1
                : 1
              : firstValue.localeCompare(secondValue);

          // Adjust for sorting direction
          if (sortDescriptor.direction === 'descending') {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  async function handleDelete() {
    if (selectedKeys !== 'all' && selectedKeys) {
      // Assuming only one key is present, extract it
      const keyIterator = selectedKeys[Symbol.iterator]();
      const firstResult = keyIterator.next();

      if (!firstResult.done) {
        const currentKey = firstResult.value;
        console.log(list.getItem(currentKey));
        await deleteEmployee(currentKey as string);
        setSelectedKeys(undefined);
        list.reload();
      }
    }
  }

  function getEmployee() {
    if (selectedKeys !== 'all' && selectedKeys) {
      // Assuming only one key is present, extract it
      const keyIterator = selectedKeys[Symbol.iterator]();
      const firstResult = keyIterator.next();

      if (!firstResult.done) {
        const currentKey = firstResult.value;
        return list.getItem(parseInt(currentKey as string));
      }
    }
    return emptyEmployee;
  }

  useEffect(() => {
    list.reload();
  }, [list.filterText]);

  return (
    <div className="flex flex-col p-10 gap-3">
      <h1 className="text-3xl">Employees</h1>

      <Card className="flex flex-row justify-around h-36">
        {isLoading ? (
          <Spinner label="Loading..." />
        ) : (
          <>
            <div className="flex flex-col items-center justify-center gap-3">
              <p className="text-2xl">{list.items.length}</p>
              <p>Employees</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
              <p className="text-2xl">
                £
                {list.items.length > 0 &&
                  (
                    list.items.reduce(
                      (acc, cur) => acc + parseFloat(cur.salary),
                      0
                    ) / list.items.length
                  ).toFixed(2)}
              </p>
              <p>Average Salary</p>
              <p></p>
            </div>
          </>
        )}
      </Card>
      <div className="flex flex-row gap-3 w-full justify-between">
        <FilterButtons />
        <Input
          className="w-96 flex-grow"
          type="text"
          label="Search"
          value={list.filterText}
          onValueChange={list.setFilterText}
        />
        <div className="flex gap-3 items-center">
          <AddEmployeeModal reload={list.reload} />
          <EditEmployeeModal
            reload={list.reload}
            selectedKeys={selectedKeys}
            employee={getEmployee()}
          />
          <Button
            isDisabled={!selectedKeys ? true : false}
            onPress={handleDelete}
          >
            Delete <TrashIcon width={20} />
          </Button>
        </div>
      </div>
      <Table
        aria-label="Employee table"
        className="max-h-[60vh]"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        isHeaderSticky
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => setSelectedKeys(keys)}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} allowsSorting>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
          emptyContent={'No rows to display.'}
          items={list.items}
        >
          {(item: Employee) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
