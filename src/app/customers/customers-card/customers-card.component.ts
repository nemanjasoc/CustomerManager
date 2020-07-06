import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Customer } from '../../models/customer.model';
import { LocalStorageService } from '../../service/local-storage.service';
import { CommunicationService } from '../../service/communication.service';
import { CustomerEditDialogComponent } from '../../customer/customer-edit-dialog/customer-edit-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  templateUrl: './customers-card.component.html',
  styleUrls: ['./customers-card.component.scss']
})
export class CustomersCardComponent implements OnInit {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];

  searchText: string;

  subscribeToDatabaseDataHasChangedSubscription: Subscription;


  constructor(public dialog: MatDialog,
    public communicationService: CommunicationService,
    private lsService: LocalStorageService) { }


  ngOnInit(): void {
    this.subscribeToDatabaseDataHasChanged();
    this.refreshData();
  }

  subscribeToDatabaseDataHasChanged() {
    this.subscribeToDatabaseDataHasChangedSubscription = this.communicationService.databaseDataHasChangedObservable()
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

  openDeleteDialog(customerForDelete: Customer) {
    this.dialog.open(ConfirmDialogComponent, {
      data: <ConfirmDialogData>{
        title: `Delete customer`,
        subtitle: 'Are you sure you want to delete this customer?'
      }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.lsService.deleteCustomer(customerForDelete);
        this.refreshData();
      }
    });
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
