import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Etudiant } from '../etudiant.model';
import { EtudiantService } from '../etudiant.service';

@Component({
  selector: 'app-etudiant-list',
  templateUrl: './etudiant-list.component.html',
  styleUrls: ['./etudiant-list.component.css']
})
export class EtudiantListComponent implements OnInit {
  displayedColumns: string[] = ['idEtudiant', 'nomE', 'prenomE', 'op', 'actions'];
  dataSource!: MatTableDataSource<Etudiant>;
  isLoading = true;
  error: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private etudiantService: EtudiantService, private router: Router) {}

  ngOnInit(): void {
    this.loadEtudiants();
  }

  loadEtudiants(): void {
    this.etudiantService.getAllEtudiants().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      (error) => {
        this.error = 'Failed to load etudiants. Please try again later.';
        console.error(error);
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

  viewEtudiant(id: number): void {
    this.router.navigate(['/etudiants/detail', id]);
  }

  editEtudiant(id: number): void {
    this.router.navigate(['/etudiants/edit', id]);
  }

  deleteEtudiant(id: number): void {
    if (confirm('Are you sure you want to delete this etudiant?')) {
      this.etudiantService.deleteEtudiant(id).subscribe(
        () => this.loadEtudiants(),
        (error) => {
          console.error('Delete error:', error);
          alert('Failed to delete etudiant.');
        }
      );
    }
  }
}
