import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent {
  employeeService = inject(EmployeeService);
  router = inject(Router);
  
  searchTerm = '';
  filteredEmployees = this.employeeService.employees;

  filterEmployees(): void {
    if (!this.searchTerm) {
      this.filteredEmployees = this.employeeService.employees;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredEmployees.set(
      this.employeeService.employees().filter(emp => 
        emp.name.toLowerCase().includes(term) || 
        emp.email.toLowerCase().includes(term)
      )
    );
  }

  editEmployee(id: number): void {
    this.router.navigate(['/home/edit', id]);
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id);
      this.filterEmployees(); // Refresh the filtered list
    }
  }
}