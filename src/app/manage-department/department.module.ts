import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular Material Imports
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
import { DepartmentLayoutComponent } from './department-layout/department-layout.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';
import { DepartmentStatisticsComponent } from './department-statistics/department-statistics.component';

// Define child routes for department management
const departmentRoutes: Routes = [
  {
    path: 'departments',
    component: DepartmentLayoutComponent,
    children: [
      { path: '', component: DepartmentListComponent },
      { path: 'new', component: DepartmentFormComponent },
      { path: 'edit/:id', component: DepartmentFormComponent },
      { path: 'detail/:id', component: DepartmentDetailComponent },
      { path: 'statistics/:id', component: DepartmentStatisticsComponent },
      { path: 'statistics', component: DepartmentStatisticsComponent }
    ]
  }
];

@NgModule({
  declarations: [
    DepartmentLayoutComponent,
    DepartmentListComponent,
    DepartmentFormComponent,
    DepartmentDetailComponent,
    DepartmentStatisticsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(departmentRoutes),
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
    // Add CUSTOM_ELEMENTS_SCHEMA to resolve component recognition issues
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class DepartmentModule { } 