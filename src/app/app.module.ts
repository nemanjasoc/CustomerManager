import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CustomersCardComponent } from './customers/customers-card/customers-card.component';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { CustomersTableComponent } from './customers/customers-table/customers-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomersCardComponent,
    CustomerEditComponent,
    CustomerDetailComponent,
    CustomersTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
