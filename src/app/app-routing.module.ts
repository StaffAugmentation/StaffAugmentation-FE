import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';

const routes: Routes = [
  { path: '', component: AppLayoutComponent,
    children: [
      { path: '', loadComponent: () => import('@modules/home/home.component').then(c => c.HomeComponent) },
      { path: 'business-request', loadChildren: ()=> import('@modules/br/br.module').then(m => m.BrModule) },
      { path: 'company', loadComponent: () => import('@modules/settings/data-type/company/company.component').then(c => c.CompanyComponent) },
      { path: 'department', loadComponent: () => import('@modules/settings/data-type/department/department.component').then(d => d.DepartmentComponent) },
      { path: 'approver', loadComponent: () => import('@modules/settings/data-type/approver/approver.component').then(c => c.ApproverComponent) },
      { path: 'profile', loadComponent: () => import('@modules/settings/data-type/profile/profile.component').then(c => c.ProfileComponent) },
      { path: 'ptm-owner', loadComponent: () => import('@modules/settings/data-type/ptm-owner/ptm-owner.component').then(c => c.PTMOwnerComponent) },
      { path: 'type', loadComponent: () => import('@modules/settings/data-type/type/type.component').then(c => c.TypeComponent) },
      { path: 'level', loadComponent: () => import('@modules/settings/data-type/level/level.component').then(c => c.LevelComponent) },
      { path: 'category', loadComponent: () => import('@modules/settings/data-type/category/category.component').then(c => c.CategoryComponent) },
      { path: 'place-of-delivery', loadComponent: () => import('@modules/settings/data-type/place-of-delivery/place-of-delivery.component').then(c => c.PlaceOfDeliveryComponent) },
      { path: 'subcontractor', loadComponent: () => import('@modules/settings/data-type/subcontractor/subcontractor.component').then(c => c.SubcontractorComponent) },
      { path: 'highest-degree', loadComponent: () => import('@modules/highest-degree/highest-degree.component').then(c => c.HighestDegreeComponent) },
      { path: 'recruitment', loadComponent: () => import('@modules/settings/data-type/recruitment/recruitment.component').then(c => c.RecruitmentComponent)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
