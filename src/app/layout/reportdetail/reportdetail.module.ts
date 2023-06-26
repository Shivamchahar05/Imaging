import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportdetailRoutingModule } from './reportdetail-routing.module';
import { ReportdetailComponent } from './reportdetail.component';
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
import {MatCardModule} from '@angular/material/card';
import { ReportdetailPipe } from 'src/app/pipe/reportdetail/reportdetail.pipe';
// import { ReportstatusPipe } from 'src/app/pipe/reportstatus/reportstatus.pipe';

@NgModule({
  declarations: [
    ReportdetailComponent,
    ReportdetailPipe
  ],
  imports: [
    CommonModule,
    ReportdetailRoutingModule,
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
    MatCardModule,
   
  ]
})
export class ReportdetailModule { }
