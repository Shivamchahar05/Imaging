import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitiatepaymentComponent } from './initiatepayment.component';

const routes: Routes = [
  {
    path:"", component:InitiatepaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitiatepaymentRoutingModule { }
