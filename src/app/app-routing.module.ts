import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersCardComponent } from './customers/customers-card/customers-card.component';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { CustomersTableComponent } from './customers/customers-table/customers-table.component';

const routes: Routes = [
  { path: 'customers-card', component: CustomersCardComponent },
  { path: 'customer-edit', component: CustomerEditComponent },
  { path: 'customer-detail', component: CustomerDetailComponent },
  { path: 'customers-table', component: CustomersTableComponent },
  { path: '', redirectTo: 'customers-card', pathMatch: 'full' },
  { path: '**', redirectTo: 'customers-card', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
