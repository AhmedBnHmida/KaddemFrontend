import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../department.model';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
  departmentForm!: FormGroup;
  isEditMode = false;
  departmentId: number | null = null;
  isLoading = false;
  error: string | null = null;
  
  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.departmentId = +params['id'];
        this.loadDepartment(this.departmentId);
      }
    });
  }

  initForm(): void {
    this.departmentForm = this.fb.group({
      nomDepartement: ['', [Validators.required, Validators.minLength(3)]],
      capacity: ['', [Validators.required, Validators.min(1)]],
      active: [true]
    });
  }

  loadDepartment(id: number): void {
    this.isLoading = true;
    this.departmentService.getDepartmentById(id).subscribe(
      (department) => {
        this.departmentForm.patchValue({
          nomDepartement: department.nomDepartement,
          capacity: department.capacity,
          active: department.active
        });
        this.isLoading = false;
      },
      (error) => {
        this.error = 'Failed to load department. Please try again later.';
        console.error('Error loading department:', error);
        this.isLoading = false;
      }
    );
  }

  onSubmit(): void {
    if (this.departmentForm.invalid) {
      return;
    }

    this.isLoading = true;
    
    if (this.isEditMode && this.departmentId) {
      const updatedDepartment: Department = {
        idDepartement: this.departmentId,
        ...this.departmentForm.value
      };
      
      this.departmentService.updateDepartment(updatedDepartment).subscribe(
        (response) => {
          this.isLoading = false;
          this.router.navigate(['/departments']);
        },
        (error) => {
          this.error = 'Failed to update department. Please try again later.';
          console.error('Error updating department:', error);
          this.isLoading = false;
        }
      );
    } else {
      this.departmentService.addDepartment(this.departmentForm.value).subscribe(
        (response) => {
          this.isLoading = false;
          this.router.navigate(['/departments']);
        },
        (error) => {
          this.error = 'Failed to add department. Please try again later.';
          console.error('Error adding department:', error);
          this.isLoading = false;
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/departments']);
  }
} 