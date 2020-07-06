import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Customer } from '../../models/customer.model';
import { LocalStorageService } from '../../service/local-storage.service';
import { CommunicationService } from '../../service/communication.service';
import { CustomerEditDialogComponent } from '../../customer/customer-edit-dialog/customer-edit-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.scss']
})
export class CustomersTableComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['gender', 'firstName', 'lastName', 'address', 'city', 'state', 'actions'];
  dataSource = new MatTableDataSource<Customer>();

  subscribeToDatabaseDataHasChangedSubscription: Subscription;

  constructor(public dialog: MatDialog,
    public communicationService: CommunicationService,
    private lsService: LocalStorageService) { }


  ngOnInit(): void {
    this.refreshData();
    this.dataSource.sort = this.sort;
    this.subscribeToDatabaseDataHasChanged();
  }

  refreshData() {
    this.dataSource.data = this.lsService.getCustomers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  subscribeToDatabaseDataHasChanged() {
    this.subscribeToDatabaseDataHasChangedSubscription = this.communicationService.databaseDataHasChangedObservable()
      .subscribe(() => {
        this.refreshData();
      })
  }

  openEditDialog(customer: Customer) {
    this.dialog.open(CustomerEditDialogComponent, {
      width: '500px',
      height: '500px',
      data: { ...customer }
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

}
