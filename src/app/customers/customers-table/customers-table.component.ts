import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { Customer } from 'src/app/models/customer.model';
import { MatDialog } from '@angular/material/dialog';
import { CustomerEditDialogComponent } from 'src/app/customer/customer-edit/customer-edit-dialog.component';
import { CommunicationService } from 'src/app/service/communication.service';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.scss']
})
export class CustomersTableComponent implements OnInit {
  customers: Customer[] = [];

  displayedColumns: string[] = ['gender', 'firstName', 'lastName', 'address', 'city', 'state'];
  public dataSource = new MatTableDataSource<Customer>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(public dialog: MatDialog, 
    public communicationService: CommunicationService,
    private lsService: LocalStorageService) { }


  ngOnInit(): void {
    this.customers = this.lsService.getCustomers();
    this.dataSource.data = this.customers;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    this.dialog.open(CustomerEditDialogComponent, {
      height: '600px',
      width: '600px'
    }).afterClosed().subscribe(() => {
      this.customers = this.lsService.getCustomers();
    });
    this.communicationService.editCustomerIsOpen = false;
  }

}
