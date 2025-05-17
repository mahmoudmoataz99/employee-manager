// import { Injectable, signal } from '@angular/core';
// import { Employee } from '../interfaces/employee';

// @Injectable({
//   providedIn: 'root'
// })
// export class EmployeeService {
//   private readonly STORAGE_KEY = 'employee-management-employees';
//   employees = signal<Employee[]>([]);

//   constructor() {
//     this.loadEmployees();
//   }

//   private loadEmployees(): void {
//     const employees = localStorage.getItem(this.STORAGE_KEY);
//     this.employees.set(employees ? JSON.parse(employees) : this.getDefaultEmployees());
//   }

//   private saveEmployees(): void {
//     localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.employees()));
//   }

//   private getDefaultEmployees(): Employee[] {
//     return [
//       { id: 1, name: 'John Doe', email: 'john@example.com', imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg', salary: 50000 },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg', salary: 60000 },
//       { id: 3, name: 'Bob Johnson', email: 'bob@example.com', imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg', salary: 55000 }
//     ];
//   }

//   getEmployee(id: number): Employee | undefined {
//     return this.employees().find(emp => emp.id === id);
//   }

//   addEmployee(employee: Omit<Employee, 'id'>): void {
//     const newEmployee = {
//       ...employee,
//       id: this.generateId()
//     };
//     this.employees.update(employees => [...employees, newEmployee]);
//     this.saveEmployees();
//   }

//   updateEmployee(id: number, employee: Partial<Employee>): void {
//     this.employees.update(employees =>
//       employees.map(emp =>
//         emp.id === id ? { ...emp, ...employee } : emp
//       )
//     );
//     this.saveEmployees();
//   }

//   deleteEmployee(id: number): void {
//     this.employees.update(employees => employees.filter(emp => emp.id !== id));
//     this.saveEmployees();
//   }

//   private generateId(): number {
//     const employees = this.employees();
//     return employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1;
//   }
// }

import { Injectable, signal } from '@angular/core';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly STORAGE_KEY = 'employee-management-employees';
  employees = signal<Employee[]>([]);

  constructor() {
    this.loadEmployees();
  }

  private loadEmployees(): void {
    const employees = localStorage.getItem(this.STORAGE_KEY);
    this.employees.set(
      employees ? JSON.parse(employees) : this.getDefaultEmployees()
    );
  }

  private saveEmployees(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.employees()));
  }

  private getDefaultEmployees(): Employee[] {
    return [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
        salary: 50000,
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
        salary: 60000,
      },
      {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob@example.com',
        imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
        salary: 55000,
      },
    ];
  }

  getEmployee(id: number): Employee | undefined {
    return this.employees().find((emp) => emp.id === id);
  }

  addEmployee(employee: Omit<Employee, 'id'>): void {
    const newEmployee = {
      ...employee,
      id: this.generateId(),
    };
    this.employees.update((employees) => [...employees, newEmployee]);
    this.saveEmployees();
  }

  updateEmployee(id: number, employee: Partial<Employee>): void {
    this.employees.update((employees) =>
      employees.map((emp) => (emp.id === id ? { ...emp, ...employee } : emp))
    );
    this.saveEmployees();
  }

  deleteEmployee(id: number): void {
    this.employees.update((employees) =>
      employees.filter((emp) => emp.id !== id)
    );
    this.saveEmployees();
  }

  private generateId(): number {
    const employees = this.employees();
    return employees.length > 0
      ? Math.max(...employees.map((emp) => emp.id)) + 1
      : 1;
  }
}
