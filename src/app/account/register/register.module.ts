import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import { ProfileComponent } from './profile/profile.component';
import { DocumentComponent } from './document/document.component';
import { PhotoComponent } from './photo/photo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MappopupComponent } from './mappopup/mappopup.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormserviceService } from 'src/app/services/Formservice/formservice.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { RegistervalidationComponent } from './registervalidation/registervalidation.component';


@NgModule({
  declarations: [
    RegisterComponent,
    ProfileComponent,
    DocumentComponent,
    PhotoComponent,
    MappopupComponent,
    RegistervalidationComponent,
    
  
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  providers:[FormserviceService]
  
})
export class RegisterModule {
  constructor(){
    console.log("register");
    
  }
  

 }
