import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CustomersCardComponent } from './customers/customers-card/customers-card.component';
import { CustomerEditDialogComponent } from './customer/customer-edit/customer-edit-dialog.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { CustomersTableComponent } from './customers/customers-table/customers-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomersCardComponent,
    CustomerEditDialogComponent,
    CustomerDetailsComponent,
    CustomersTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
