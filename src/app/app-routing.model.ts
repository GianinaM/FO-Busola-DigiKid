import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { PaintComponent } from './paint/paint.component';
import { AppComponent } from './app/app.component';

const routes: Routes = [
  { path:'', component: AppComponent},
  {path: "employees", component: EmployeeComponent},
  {path: "paint", component: PaintComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
