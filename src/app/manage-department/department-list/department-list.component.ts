import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Department } from '../department.model';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  displayedColumns: string[] = ['idDepartement', 'nomDepartement', 'capacity', 'active', 'actions'];
  dataSource!: MatTableDataSource<Department>;
  isLoading = true;
  error: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.isLoading = true;
    this.departmentService.getAllDepartments().subscribe(
      (departments) => {
        this.dataSource = new MatTableDataSource(departments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      (error) => {
        this.error = 'Failed to load departments. Please try again later.';
        console.error('Error loading departments:', error);
        this.isLoading = false;
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editDepartment(id: number): void {
    this.router.navigate(['/departments/edit', id]);
  }

  viewDepartment(id: number): void {
    this.router.navigate(['/departments/detail', id]);
  }

  viewStatistics(id: number): void {
    this.router.navigate(['/departments/statistics', id]);
  }

  deleteDepartment(id: number): void {
    if (confirm('Are you sure you want to delete this department?')) {
      this.departmentService.deleteDepartment(id).subscribe(
        () => {
          this.loadDepartments();
        },
        (error) => {
          console.error('Error deleting department:', error);
          alert('Failed to delete department. Please try again later.');
        }
      );
    }
  }

  loadActiveDepartments(): void {
    this.isLoading = true;
    this.departmentService.getActiveDepartments().subscribe(
      (departments) => {
        this.dataSource = new MatTableDataSource(departments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      (error) => {
        this.error = 'Failed to load active departments. Please try again later.';
        console.error('Error loading active departments:', error);
        this.isLoading = false;
      }
    );
  }

  filterByCapacity(): void {
    const capacity = prompt('Enter minimum capacity:');
    if (capacity !== null && !isNaN(Number(capacity))) {
      this.isLoading = true;
      this.departmentService.getDepartmentsByCapacity(Number(capacity)).subscribe(
        (departments) => {
          this.dataSource = new MatTableDataSource(departments);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoading = false;
        },
        (error) => {
          this.error = 'Failed to filter departments by capacity. Please try again later.';
          console.error('Error filtering departments by capacity:', error);
          this.isLoading = false;
        }
      );
    }
  }

  resetFilters(): void {
    this.loadDepartments();
  }
} 