export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  salary: string;
  department: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface filterValue {
  filter: string;
  value: string;
}
