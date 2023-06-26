import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditprofileRoutingModule } from './editprofile-routing.module';
import { EditprofileComponent } from './editprofile.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { AddresspopComponent } from './addresspop.component';
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [
    EditprofileComponent,
    AddresspopComponent
  ],
  imports: [
    CommonModule,
    EditprofileRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class EditprofileModule { }
