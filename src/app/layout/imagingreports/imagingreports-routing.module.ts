import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImagingreportsComponent } from './imagingreports.component';

const routes: Routes = [
{
  path:"", component:ImagingreportsComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImagingreportsRoutingModule { }
