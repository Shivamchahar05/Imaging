import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportdetailComponent } from './reportdetail.component';

const routes: Routes = [
  {
    path:"", component:ReportdetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportdetailRoutingModule { }
