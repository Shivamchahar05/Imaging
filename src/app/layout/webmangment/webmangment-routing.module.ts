import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebmangmentComponent } from './webmangment.component';

const routes: Routes = [{
  path: '', component:WebmangmentComponent, children: [
    { path: '', redirectTo: 'template-management', pathMatch: 'full' },
    { path: 'template-management', loadChildren: () => import('./template-management/template-management.module').then(m => m.TemplateManagementModule) },
    { path: 'page-management', loadChildren: () => import('./page-management/page-management.module').then(m => m.PageManagementModule) }
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebmangmentRoutingModule { }
