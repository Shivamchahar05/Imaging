import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImagingrequestComponent } from './imagingrequest.component';

const routes: Routes = [
  {path:"", component:ImagingrequestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImagingrequestRoutingModule { }
