import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';

const routes: Routes = [
  { path: '', component: AppLayoutComponent,
    children: [
      { path: '', loadComponent: () => import('@modules/home/home.component').then(c => c.HomeComponent) },
      { path: 'business-request', loadChildren: ()=> import('@modules/br/br.module').then(m => m.BrModule) },
      { path: 'company', loadComponent: () => import('@modules/settings/data-type/company/company.component').then(c => c.CompanyComponent) },
      { path: 'department', loadComponent: () => import('@modules/settings/data-type/department/department.component').then(c => c.DepartmentComponent) },
      { path: 'approver', loadComponent: () => import('@modules/settings/data-type/approver/approver.component').then(c => c.ApproverComponent) },
      { path: 'profile', loadComponent: () => import('@modules/settings/data-type/profile/profile.component').then(c => c.ProfileComponent) },
      { path: 'ptm-owner', loadComponent: () => import('@modules/settings/data-type/ptm-owner/ptm-owner.component').then(c => c.PTMOwnerComponent) },
      { path: 'type', loadComponent: () => import('@modules/settings/data-type/type/type.component').then(c => c.TypeComponent) },
      { path: 'level', loadComponent: () => import('@modules/settings/data-type/level/level.component').then(c => c.LevelComponent) },
      { path: 'category', loadComponent: () => import('@modules/settings/data-type/category/category.component').then(c => c.CategoryComponent) },
      { path: 'place-of-delivery', loadComponent: () => import('@modules/settings/data-type/place-of-delivery/place-of-delivery.component').then(c => c.PlaceOfDeliveryComponent) },
      { path: 'subcontractor', loadComponent: () => import('@modules/settings/data-type/subcontractor/subcontractor.component').then(c => c.SubcontractorComponent) },
      { path: 'highest-degree', loadComponent: () => import('@modules/highest-degree/highest-degree.component').then(c => c.HighestDegreeComponent) },
      { path: 'recruitment', loadComponent: () => import('@modules/settings/data-type/recruitment/recruitment.component').then(c => c.RecruitmentComponent)},
      { path: 'forecasts', loadComponent: () => import('@modules/settings/data-type/forecasts/forecasts.component').then(c => c.ForecastsComponent)},
      { path: 'date-picker', loadComponent: () => import('@modules/settings/data-type/date-picker/date-picker.component').then(c => c.DatePickerComponent)},
      { path: 'country', loadComponent: () => import('@modules/settings/data-type/country/country.component').then(c => c.CountryComponent)},
      { path: 'tree-view', loadComponent: () => import('@modules/settings/tree-view/tree-view.component').then(c => c.TreeViewComponent)},
      { path: 'role-management', loadComponent: () => import('@modules/settings/role-management/role-management.component').then(c => c.RoleManagementComponent)},
      { path: 'app-parameter', loadComponent: () => import('@modules/settings/app-parameter/app-parameter.component').then(c => c.AppParameterComponent)},
      { path: 'oerp-code', loadComponent: () => import('@modules/settings/data-type/oerp-code/oerp-code.component').then(c => c.OERPCodeComponent)},
      { path: 'country', loadComponent: () => import('@modules/settings/data-type/country/country.component').then(c => c.CountryComponent)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
