import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthguardGuard } from './guards/authguard.guard';
import { LoginguardGuard } from './guards/loginguard.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
       {
         path: "",
         loadChildren: () => import(`./account/account.module`).then(m => m.AccountModule),
         canActivate:[LoginguardGuard]
        },
        {
          path: "layout",
          loadChildren: () => import(`./layout/layout.module`).then(m => m.LayoutModule),
          canActivate: [AuthguardGuard],
        },
        {
          path: "registervalidate",
          loadChildren: () => import(`./registervalidate/registervalidate.module`).then(m => m.RegistervalidateModule)
        },
       
        { path: '', redirectTo: '', pathMatch: 'full' },

         { path: '**', component: PagenotfoundComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
