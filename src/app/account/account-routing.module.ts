import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';

const routes: Routes = [
  {
    path: '', component:AccountComponent, 
    children: [
      {
        path: "",
        loadChildren: () => import(`./loginsignup/loginsignup.module`).then(m => m.LoginsignupModule)
      },
      {
        path: "create-account/:data",
        loadChildren: () => import(`./register/register.module`).then(m => m.RegisterModule)
      },
      {
        path: "reset-password/:token/:email",
        loadChildren: () => import(`./resetpassword/resetpassword.module`).then(m => m.ResetpasswordModule)
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
