import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '', component:LayoutComponent, children: [
      { path: '', redirectTo:"imagingrequest",pathMatch:'full' },
      {
        path: "imagingrequest",
        loadChildren: () => import(`./imagingrequest/imagingrequest.module`).then(m => m.ImagingrequestModule)
      },
      {
        path: "imagingreports",
        loadChildren: () => import(`./imagingreports/imagingreports.module`).then(m => m.ImagingreportsModule)
      },
      {
        path: "eclaims",
        loadChildren: () => import(`./eclaims/eclaims.module`).then(m => m.EclaimsModule)
      },
      {
        path: "tests",
        loadChildren: () => import(`./tests/tests.module`).then(m => m.TestsModule)
      },
      {
        path: "payments",
        loadChildren: () => import(`./payments/payments.module`).then(m => m.PaymentsModule)
      },
      {
        path: "profile",
        loadChildren: () => import(`./profile/profile.module`).then(m => m.ProfileModule)
      },
      {
        path: "editprofile",
        loadChildren: () => import(`./editprofile/editprofile.module`).then(m => m.EditprofileModule)
      },
      {
        path: "reportdetail",
        loadChildren: () => import(`./reportdetail/reportdetail.module`).then(m => m.ReportdetailModule)
      },
      {
        path: "createclaim",
        loadChildren: () => import(`./createclaim/createclaim.module`).then(m => m.CreateclaimModule)
      },
      {
        path: "initiatepayment",
        loadChildren: () => import(`./initiatepayment/initiatepayment.module`).then(m => m.InitiatepaymentModule)
      },
      {
        path: "webmangment",
        loadChildren: () => import(`./webmangment/webmangment.module`).then(m => m.WebmangmentModule)
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
