import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../department.service';
import { DepartmentStatistics, Department } from '../department.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-department-statistics',
  templateUrl: './department-statistics.component.html',
  styleUrls: ['./department-statistics.component.css']
})
export class DepartmentStatisticsComponent implements OnInit {
  departmentId: number | null = null;
  isSpecificDepartment = false;
  departmentName = '';
  statistics: DepartmentStatistics | null = null;
  studentsPerDepartment: Record<string, number> = {};
  departmentMap: Record<string, number> = {}; // Map department names to IDs
  isLoading = false;
  loadingMessage = '';
  error: string | null = null;
  
  // Expose Object to the template
  Object = Object;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.departmentId = +params['id'];
        this.isSpecificDepartment = true;
        this.loadDepartmentName();
        this.loadDepartmentStatistics();
      } else {
        this.loadStudentsPerDepartment();
        this.loadDepartmentNameToIdMap();
      }
    });
  }

  loadDepartmentNameToIdMap(): void {
    this.departmentService.getAllDepartments().subscribe(
      (departments) => {
        // Create a map of department names to their IDs
        departments.forEach(dept => {
          this.departmentMap[dept.nomDepartement] = dept.idDepartement || 0;
        });
      },
      (error) => {
        console.error('Error loading department map:', error);
      }
    );
  }

  loadDepartmentName(): void {
    if (!this.departmentId) return;
    
    this.departmentService.getDepartmentById(this.departmentId).subscribe(
      (department) => {
        this.departmentName = department.nomDepartement;
      },
      (error) => {
        console.error('Error loading department:', error);
      }
    );
  }

  loadDepartmentStatistics(): void {
    if (!this.departmentId) return;
    
    this.isLoading = true;
    this.loadingMessage = 'Loading department statistics...';
    this.departmentService.getDepartmentStatistics(this.departmentId).subscribe(
      (statistics) => {
        this.statistics = statistics;
        this.isLoading = false;
        this.loadingMessage = '';
      },
      (error) => {
        this.error = 'Failed to load department statistics. Please try again later.';
        console.error('Error loading department statistics:', error);
        this.isLoading = false;
        this.loadingMessage = '';
      }
    );
  }

  loadStudentsPerDepartment(): void {
    this.isLoading = true;
    this.loadingMessage = 'Loading student statistics...';
    this.departmentService.getStudentsPerDepartment().subscribe(
      (data) => {
        this.studentsPerDepartment = data;
        this.isLoading = false;
        this.loadingMessage = '';
      },
      (error) => {
        this.error = 'Failed to load students per department. Please try again later.';
        console.error('Error loading students per department:', error);
        this.isLoading = false;
        this.loadingMessage = '';
      }
    );
  }

  goBack(): void {
    if (this.isSpecificDepartment && this.departmentId) {
      this.router.navigate(['/departments/detail', this.departmentId]);
    } else {
      this.router.navigate(['/departments']);
    }
  }

  viewDepartmentDetail(departmentName: string): void {
    // First, check if we have the department ID in our map
    if (this.departmentMap[departmentName]) {
      this.loadingMessage = `Navigating to ${departmentName} details...`;
      this.isLoading = true;
      this.router.navigate(['/departments/detail', this.departmentMap[departmentName]]);
      return;
    }

    // If we don't have the ID yet, look it up
    this.isLoading = true;
    this.loadingMessage = `Finding details for ${departmentName}...`;
    this.departmentService.getAllDepartments()
      .pipe(
        map(departments => departments.find(d => d.nomDepartement === departmentName))
      )
      .subscribe(
        (department) => {
          this.isLoading = false;
          this.loadingMessage = '';
          if (department && department.idDepartement) {
            // Save the ID in the map for future use
            this.departmentMap[departmentName] = department.idDepartement;
            this.loadingMessage = `Navigating to ${departmentName} details...`;
            this.isLoading = true;
            this.router.navigate(['/departments/detail', department.idDepartement]);
          } else {
            console.error(`Department with name "${departmentName}" not found`);
            alert(`Could not find department details for "${departmentName}"`);
          }
        },
        (error) => {
          this.isLoading = false;
          this.loadingMessage = '';
          console.error('Error looking up department:', error);
          alert('Failed to load department details. Please try again later.');
        }
      );
  }
  
  // Helper methods for template
  getKeys(obj: Record<string, any>): string[] {
    return Object.keys(obj);
  }
  
  getPercentage(count: number): number {
    if (!this.studentsPerDepartment || Object.keys(this.studentsPerDepartment).length === 0) {
      return 0;
    }
    
    const maxCount = Math.max(...Object.values(this.studentsPerDepartment));
    return (count / maxCount) * 100;
  }
  
  getAdditionalKeys(): string[] {
    if (!this.statistics) {
      return [];
    }
    
    // Exclude the standard keys that we're already displaying
    const standardKeys = ['studentCount', 'professorCount', 'courseCount', 
                          'averageGrade', 'utilizationRate', 'maleToFemaleRatio'];
    
    return Object.keys(this.statistics)
      .filter(key => !standardKeys.includes(key));
  }
  
  formatStatKey(key: string): string {
    // Convert camelCase to Title Case with spaces
    const result = key.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
  
  formatStatValue(value: any): string {
    if (typeof value === 'number') {
      // Check if it's likely a percentage
      if (value >= 0 && value <= 1) {
        return `${(value * 100).toFixed(1)}%`;
      }
      // For other numbers, format with up to 1 decimal place
      return value.toFixed(1).replace(/\.0$/, '');
    }
    
    return String(value);
  }
} 