import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Etudiant } from '../etudiant.model';
import { EtudiantService } from '../etudiant.service';

@Component({
  selector: 'app-etudiant-form',
  templateUrl: './etudiant-form.component.html',
  styleUrls: ['./etudiant-form.component.css']
})
export class EtudiantFormComponent implements OnInit {
  etudiantForm!: FormGroup;
  isEditMode = false;
  etudiantId: number | null = null;
  isLoading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private etudiantService: EtudiantService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.etudiantId = +params['id'];
        this.loadEtudiant(this.etudiantId);
      }
    });
  }

  initForm(): void {
    this.etudiantForm = this.fb.group({
      prenomE: ['', [Validators.required, Validators.minLength(2)]],
      nomE: ['', [Validators.required, Validators.minLength(2)]],
      op: ['', Validators.required]
    });
  }

  loadEtudiant(id: number): void {
    this.isLoading = true;
    this.etudiantService.getEtudiantById(id).subscribe(
      (etudiant) => {
        this.etudiantForm.patchValue({
          prenomE: etudiant.prenomE,
          nomE: etudiant.nomE,
          op: etudiant.op
        });
        this.isLoading = false;
      },
      (error) => {
        this.error = 'Failed to load etudiant.';
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  onSubmit(): void {
    if (this.etudiantForm.invalid) return;

    this.isLoading = true;

    if (this.isEditMode && this.etudiantId) {
      const updatedEtudiant: Etudiant = {
        idEtudiant: this.etudiantId,
        ...this.etudiantForm.value
      };
      this.etudiantService.updateEtudiant(updatedEtudiant).subscribe(
        () => this.router.navigate(['/etudiants']),
        (error) => {
          this.error = 'Failed to update etudiant.';
          this.isLoading = false;
        }
      );
    } else {
      this.etudiantService.addEtudiant(this.etudiantForm.value).subscribe(
        () => this.router.navigate(['/etudiants']),
        (error) => {
          this.error = 'Failed to add etudiant.';
          this.isLoading = false;
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/etudiants']);
  }
}
