import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Etudiant } from '../etudiant.model';
import { EtudiantService } from '../etudiant.service';

@Component({
  selector: 'app-etudiant-detail',
  templateUrl: './etudiant-detail.component.html',
  styleUrls: ['./etudiant-detail.component.css']
})
export class EtudiantDetailComponent implements OnInit {
  etudiantId: number = 0;
  etudiant!: Etudiant;
  isLoading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private etudiantService: EtudiantService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.etudiantId = +params['id'];
        this.loadEtudiant();
      }
    });
  }

  loadEtudiant(): void {
    this.isLoading = true;
    this.etudiantService.getEtudiantById(this.etudiantId).subscribe(
      (data) => {
        this.etudiant = data;
        this.isLoading = false;
      },
      (error) => {
        this.error = 'Failed to load etudiant.';
        this.isLoading = false;
        console.error(error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/etudiants']);
  }

  editEtudiant(): void {
    this.router.navigate(['/etudiants/edit', this.etudiantId]);
  }
}
