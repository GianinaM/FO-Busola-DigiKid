import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { EmployeeComponent } from './employee/employee.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.model';
import { PaintComponent } from './paint/paint.component';
import { AppComponent } from './app/app.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    PaintComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
