import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerEditDialogComponent } from 'src/app/customer/customer-edit-dialog/customer-edit-dialog.component';
import { Customer } from '../../models/customer.model';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { CommunicationService } from 'src/app/service/communication.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './customers-card.component.html',
  styleUrls: ['./customers-card.component.scss']
})
export class CustomersCardComponent implements OnInit {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];

  searchText: string;

  subscribeToNewCustomerIsAddedSubscription: Subscription;


  constructor(public dialog: MatDialog, 
    public communicationService: CommunicationService,
    private lsService: LocalStorageService) { }


  ngOnInit(): void {
    this.subscribeToNewCustomerIsAdded();
    this.refreshData();
  }

  subscribeToNewCustomerIsAdded() {
    this.subscribeToNewCustomerIsAddedSubscription = this.communicationService.newCustomerIsAddedObservable()
    .subscribe(() => {
      this.refreshData();
    })
  }

  refreshData() {
    this.customers = this.lsService.getCustomers();
    this.applyFilter(this.searchText);
  }

  openEditDialog(customerForEdit?: Customer) {
    this.dialog.open(CustomerEditDialogComponent, {
      width: '500px',
      height: '500px',
      data: customerForEdit ? { ...customerForEdit } : null
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.refreshData();
      }
    });
  }

  deleteCustomer(id: number) {
    this.lsService.deleteCustomer(id);
    this.refreshData();
  }

  openCustomerDetails(customerDetails: Customer) {
    this.lsService.setCustomerDetails(customerDetails);
  }

  searchCustomer(event): void {
    this.searchText = event.target.value;
    this.applyFilter(this.searchText);
  }

  applyFilter(searchText: string) {
    if (!searchText || !searchText.length) {
      this.filteredCustomers = this.customers;
      return
    }

    this.filteredCustomers = this.customers.filter(item => {
      return (item.firstName).toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        (item.lastName).toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        (item.city).toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        (item.state).toLocaleLowerCase().includes(searchText.toLocaleLowerCase());
    })
  }
}
