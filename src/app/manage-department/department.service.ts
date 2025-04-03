import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department, DepartmentInput, DepartmentStatistics, Professor } from './department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'http://192.168.33.10:8089/kaddem';

  constructor(private http: HttpClient) { }

  // Get all departments
  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}/departement/retrieve-all-departements`);
  }

  // Get department by ID
  getDepartmentById(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/departement/retrieve-departement/${id}`);
  }

  // Add a new department
  addDepartment(department: DepartmentInput): Observable<Department> {
    return this.http.post<Department>(`${this.apiUrl}/departement/add-departement`, department);
  }

  // Update a department
  updateDepartment(department: Department): Observable<Department> {
    return this.http.put<Department>(`${this.apiUrl}/departement/update-departement`, department);
  }

  // Delete a department
  deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/departement/remove-departement/${id}`);
  }

  // Get departments by capacity
  getDepartmentsByCapacity(capacity: number): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}/departement/capacity-greater-than/${capacity}`);
  }

  // Get active departments
  getActiveDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}/departement/active`);
  }

  // Get student count per department
  getStudentsPerDepartment(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.apiUrl}/departement/students-per-department`);
  }

  // Assign professor to department
  assignProfessorToDepartment(professorId: number, departmentId: number): Observable<string> {
    return this.http.post<string>(
      `${this.apiUrl}/departement/assign-professor/${professorId}/to-department/${departmentId}`,
      {}
    );
  }

  // Assign course to department
  assignCourseToDepartment(courseId: number, departmentId: number): Observable<string> {
    return this.http.post<string>(
      `${this.apiUrl}/departement/assign-course/${courseId}/to-department/${departmentId}`,
      {}
    );
  }

  // Get department efficiency
  getDepartmentEfficiency(departmentId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/departement/efficiency/${departmentId}`);
  }

  // Get department statistics
  getDepartmentStatistics(departmentId: number): Observable<DepartmentStatistics> {
    return this.http.get<DepartmentStatistics>(`${this.apiUrl}/departement/statistics/${departmentId}`);
  }

  // Get professors by experience in a department
  getProfessorsByExperience(departmentId: number): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${this.apiUrl}/departement/professors-by-experience/${departmentId}`);
  }
} 