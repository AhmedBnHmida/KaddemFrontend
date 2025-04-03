import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department, Professor } from '../department.model';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.css']
})
export class DepartmentDetailComponent implements OnInit {
  departmentId: number = 0;
  department!: Department;
  professors: Professor[] = [];
  isLoading = false;
  error: string | null = null;
  efficiency: number | null = null;
  studentsPerDepartment: Record<string, number> = {};
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.departmentId = +params['id'];
        this.loadDepartment();
        this.loadProfessorsByExperience();
        this.loadDepartmentEfficiency();
      }
    });
  }

  loadDepartment(): void {
    this.isLoading = true;
    this.departmentService.getDepartmentById(this.departmentId).subscribe(
      (department) => {
        this.department = department;
        this.isLoading = false;
      },
      (error) => {
        this.error = 'Failed to load department details. Please try again later.';
        console.error('Error loading department:', error);
        this.isLoading = false;
      }
    );
  }

  loadProfessorsByExperience(): void {
    this.departmentService.getProfessorsByExperience(this.departmentId).subscribe(
      (professors) => {
        this.professors = professors;
      },
      (error) => {
        console.error('Error loading professors by experience:', error);
      }
    );
  }

  loadDepartmentEfficiency(): void {
    this.departmentService.getDepartmentEfficiency(this.departmentId).subscribe(
      (efficiency) => {
        this.efficiency = efficiency;
      },
      (error) => {
        console.error('Error loading department efficiency:', error);
      }
    );
  }

  editDepartment(): void {
    this.router.navigate(['/departments/edit', this.departmentId]);
  }

  viewStatistics(): void {
    this.router.navigate(['/departments/statistics', this.departmentId]);
  }

  goBack(): void {
    this.router.navigate(['/departments']);
  }

  assignProfessor(): void {
    const professorId = prompt('Enter professor ID:');
    if (professorId !== null && !isNaN(Number(professorId))) {
      this.departmentService.assignProfessorToDepartment(Number(professorId), this.departmentId).subscribe(
        (response) => {
          alert('Professor assigned successfully');
          this.loadDepartment();
          this.loadProfessorsByExperience();
        },
        (error) => {
          alert('Failed to assign professor. Please try again later.');
          console.error('Error assigning professor:', error);
        }
      );
    }
  }

  assignCourse(): void {
    const courseId = prompt('Enter course ID:');
    if (courseId !== null && !isNaN(Number(courseId))) {
      this.departmentService.assignCourseToDepartment(Number(courseId), this.departmentId).subscribe(
        (response) => {
          alert('Course assigned successfully');
          this.loadDepartment();
        },
        (error) => {
          alert('Failed to assign course. Please try again later.');
          console.error('Error assigning course:', error);
        }
      );
    }
  }
} 