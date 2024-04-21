import { create } from 'zustand';
import { Employee } from '../utils/types';

// TYPE:
interface State {
  allEmployees: Employee[];
  setAllEmployees: (employees: Employee[]) => void;
  displayEmployees: Employee[];
  setDisplayEmployees: (employees: Employee[]) => void;
}

// STORE:
export const useStore = create<State>((set) => ({
  allEmployees: [],
  setAllEmployees: (newEmployees) =>
    set(() => ({
      allEmployees: newEmployees,
      displayEmployees: newEmployees,
    })),

  displayEmployees: [],
  setDisplayEmployees: (employees) =>
    set(() => ({
      displayEmployees: employees,
    })),
}));
