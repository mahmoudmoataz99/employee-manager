import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { NgClass } from '@angular/common';
import { Employee } from '../../interfaces/employee';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit {
  employeeService = inject(EmployeeService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  isEditMode = signal(false);
  employeeId = signal<number | null>(null);

  employeeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    imageUrl: new FormControl('', Validators.required),
    salary: new FormControl<number | null>(null, [Validators.required, Validators.min(0)])
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.employeeId.set(Number(id));
      this.loadEmployeeData(Number(id));
    }
  }

  loadEmployeeData(id: number): void {
    const employee = this.employeeService.getEmployee(id);
    if (employee) {
      this.employeeForm.patchValue({
        name: employee.name,
        email: employee.email,
        imageUrl: employee.imageUrl,
        salary: employee.salary
      });
    }
  }

  onSubmit(): void {
  if (this.employeeForm.valid) {
    const employeeData = this.employeeForm.getRawValue(); // Use getRawValue() instead of value
    
    if (this.isEditMode() && this.employeeId()) {
      // Cast to Partial<Employee> and filter out null values
      const updateData: Partial<Employee> = {};
      if (employeeData.name !== null) updateData.name = employeeData.name;
      if (employeeData.email !== null) updateData.email = employeeData.email;
      if (employeeData.imageUrl !== null) updateData.imageUrl = employeeData.imageUrl;
      if (employeeData.salary !== null) updateData.salary = employeeData.salary;
      
      this.employeeService.updateEmployee(this.employeeId()!, updateData);
    } else {
      // For new employees, we can assert non-null since form is valid
      this.employeeService.addEmployee({
        name: employeeData.name!,
        email: employeeData.email!,
        imageUrl: employeeData.imageUrl!,
        salary: employeeData.salary!
      });
    }
    
    this.router.navigate(['/']);
  }
}

  onCancel(): void {
    this.router.navigate(['/']);
  }
}