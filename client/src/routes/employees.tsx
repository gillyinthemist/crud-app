import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  getKeyValue,
  Input,
  SortDescriptor,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';

import { Employee } from '../utils/types';
import { fetchEmployees } from '../services/api-service';
import { useAsyncList } from '@react-stately/data';
import { useEffect, useState } from 'react';
import {
  PencilIcon,
  PlusCircleIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

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
  const [isLoading, setIsLoading] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState();

  const list = useAsyncList<Employee>({
    async load({ filterText }) {
      setIsLoading(true);
      const res = await fetchEmployees(filterText);
      setIsLoading(false);
      return {
        items: res,
      };
    },
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

  useEffect(() => {
    list.reload();
  }, [list.filterText]);

  return (
    <div className="flex flex-col p-10 gap-10">
      <div className="flex flex-row w-full justify-between">
        <h1>Employees</h1>
        {/* <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">Open Menu</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Dynamic Actions" items={items}>
            {(item) => (
              <DropdownItem
                key={item.key}
                color={item.key === 'delete' ? 'danger' : 'default'}
                className={item.key === 'delete' ? 'text-danger' : ''}
              >
                {item.label}
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown> */}
        <div className="flex gap-3 items-center">
          <Button>
            New employee
            <PlusIcon width={25} />
          </Button>
          <Button isDisabled={!selectedKeys ? true : false}>
            Edit <PencilIcon width={20} />
          </Button>
          <Button isDisabled={!selectedKeys ? true : false}>
            Delete <TrashIcon width={20} />
          </Button>
          <Input
            className="w-96"
            type="text"
            label="Search"
            value={list.filterText}
            onValueChange={list.setFilterText}
          />
        </div>
      </div>
      <Table
        aria-label="Employee table"
        className="max-h-[85vh]"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        isHeaderSticky
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
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
