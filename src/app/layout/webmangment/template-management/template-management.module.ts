import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateManagementRoutingModule } from './template-management-routing.module';
import { TemplateManagementComponent } from './template-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    TemplateManagementComponent
  ],
  imports: [
    CommonModule,
    TemplateManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
  ]
})
export class TemplateManagementModule { }
