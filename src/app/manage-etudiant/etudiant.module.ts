import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';

// Components
import { EtudiantLayoutComponent } from './etudiant-layout/etudiant-layout.component';
import { EtudiantListComponent } from './etudiant-list/etudiant-list.component';
import { EtudiantFormComponent } from './etudiant-form/etudiant-form.component';
import { EtudiantDetailComponent } from './etudiant-detail/etudiant-detail.component';

// Routes
const etudiantRoutes: Routes = [
  {
    path: '',
    component: EtudiantLayoutComponent,
    children: [
      { path: '', component: EtudiantListComponent },
      { path: 'new', component: EtudiantFormComponent },
      { path: 'edit/:id', component: EtudiantFormComponent },
      { path: 'detail/:id', component: EtudiantDetailComponent }
    ]
  }
];

@NgModule({
  declarations: [
    EtudiantLayoutComponent,
    EtudiantListComponent,
    EtudiantFormComponent,
    EtudiantDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(etudiantRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTooltipModule,
    MatChipsModule,
    MatListModule
  ],
  exports: [
    RouterModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class EtudiantModule { }
