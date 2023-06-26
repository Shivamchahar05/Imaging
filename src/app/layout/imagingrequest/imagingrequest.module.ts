import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagingrequestRoutingModule } from './imagingrequest-routing.module';
import { ImagingrequestComponent } from './imagingrequest.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AcceptbalancenotComponent } from './accept/acceptbalancenot/acceptbalancenot.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { InsuranceDetailsComponent } from './insurance_details/insurance-details.component';
import { SendotpComponent } from './sendotp/sendotp.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { AccepttestStatusPipe } from 'src/app/pipe/accepttest-status.pipe';
@NgModule({
  declarations: [
    ImagingrequestComponent,
    AcceptbalancenotComponent,
    InsuranceDetailsComponent,
    SendotpComponent,
    AccepttestStatusPipe
  ],
  imports: [
    CommonModule,
    ImagingrequestRoutingModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatCheckboxModule,
    NgOtpInputModule
  ]
})
export class ImagingrequestModule { 
  constructor(){
    console.log("request");
    
  }
}
