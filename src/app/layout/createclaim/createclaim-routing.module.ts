import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateclaimComponent } from './createclaim.component';

const routes: Routes = [
  {path:"", component:CreateclaimComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateclaimRoutingModule { }
