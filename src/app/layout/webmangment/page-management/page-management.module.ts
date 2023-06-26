import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageManagementRoutingModule } from './page-management-routing.module';
import { PageManagementComponent } from './page-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    PageManagementComponent
  ],
  imports: [
    CommonModule,
    PageManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class PageManagementModule { }
