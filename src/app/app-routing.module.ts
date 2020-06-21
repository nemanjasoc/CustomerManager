import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersCardComponent } from './customers/customers-card/customers-card.component';
import { CustomersTableComponent } from './customers/customers-table/customers-table.component';
import { CustomersMapComponent } from './customers/customers-map/customers-map.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';

const routes: Routes = [
  { path: 'customers-card', component: CustomersCardComponent },
  { path: 'customers-table', component: CustomersTableComponent },
  { path: 'customers-map', component: CustomersMapComponent },
  { path: 'customer-details', component: CustomerDetailsComponent },
  { path: '', redirectTo: 'customers-card', pathMatch: 'full' },
  { path: '**', redirectTo: 'customers-card', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
