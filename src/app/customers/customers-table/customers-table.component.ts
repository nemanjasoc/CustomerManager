import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { Customer } from '../../models/customer.model';
import { MatDialog } from '@angular/material/dialog';
import { CustomerEditDialogComponent } from '../../customer/customer-edit-dialog/customer-edit-dialog.component';
import { CustomerDeleteDialogComponent } from '../../customer/customer-delete-dialog/customer-delete-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CommunicationService } from 'src/app/service/communication.service';

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
    this.dialog.open(CustomerDeleteDialogComponent, {
      width: '280px',
      height: '150px',
      data: { ...customerForDelete }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.refreshData();
      }
    });
  }

}
