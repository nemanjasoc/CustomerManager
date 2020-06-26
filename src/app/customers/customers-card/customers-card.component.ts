import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerEditDialogComponent } from 'src/app/customer/customer-edit/customer-edit-dialog.component';
import { Customer } from 'src/app/models/customer.model';
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

  subscribeToNewCustomerIsAddedSubscription: Subscription;


  constructor(public dialog: MatDialog, 
    public communicationService: CommunicationService,
    private lsService: LocalStorageService) { }


  ngOnInit(): void {
    this.customers = this.lsService.getCustomers();
    this.filteredCustomers = this.customers;
  }

  subscribeToNewCustomerIsAdded() {
    this.subscribeToNewCustomerIsAddedSubscription = this.communicationService.newCustomerIsAddedObservable()
    .subscribe(result => {
      if (!result) {
        this.filteredCustomers = this.lsService.getCustomers();
      }
    })
  }

  openEditDialog(customerForEdit?: Customer) {
    this.dialog.open(CustomerEditDialogComponent, {
      width: '500px',
      height: '500px',
      data: customerForEdit ? { ...customerForEdit } : null
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.filteredCustomers = this.lsService.getCustomers();
      }
    });
  }

  deleteCustomer(customerForDelete: Customer) {
    let allCustomers = this.lsService.getCustomers();
    let newCustomers = [];

    allCustomers.forEach(currentCustomer => {
      if (currentCustomer.id !== customerForDelete.id) {
        newCustomers.push(currentCustomer)
      }
    })

    this.lsService.setCustomers(newCustomers);
    this.filteredCustomers = this.lsService.getCustomers();
  }

  openCustomerDetails(customerDetails: Customer) {
    this.lsService.setCustomerDetails(customerDetails);
  }

  searchCustomer(event): void {
    let searchText = event.target.value;

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
