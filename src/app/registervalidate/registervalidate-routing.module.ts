import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistervalidateComponent } from './registervalidate.component';

const routes: Routes = [
  {path:"" , component:RegistervalidateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistervalidateRoutingModule { }
