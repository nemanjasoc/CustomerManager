import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { Customer } from 'src/app/models/customer.model';
import { MatDialog } from '@angular/material/dialog';
import { CustomerEditDialogComponent } from 'src/app/customer/customer-edit/customer-edit-dialog.component';
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
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  customers: Customer[] = [];

  subscribeToNewCustomerIsAddedSubscription: Subscription;

  displayedColumns: string[] = ['gender', 'firstName', 'lastName', 'address', 'city', 'state', 'id'];
  public dataSource = new MatTableDataSource<Customer>();


  constructor(public dialog: MatDialog,
    public communicationService: CommunicationService,
    private lsService: LocalStorageService) { }


  ngOnInit(): void {
    this.customers = this.lsService.getCustomers();
    this.dataSource.data = this.customers;
    this.dataSource.sort = this.sort;
    this.subscribeToNewCustomerIsAdded();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  subscribeToNewCustomerIsAdded() {
    this.subscribeToNewCustomerIsAddedSubscription = this.communicationService.newCustomerIsAddedObservable()
    .subscribe(result => {
        this.customers = this.lsService.getCustomers();
    })
  }

  openEditDialog(customerForEditId?: number) {
    this.dialog.open(CustomerEditDialogComponent, {
      width: '500px',
      height: '500px',
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.customers = this.lsService.getCustomers();
      }
    });
  }

  deleteCustomer(customerForDeleteId: number) {
    let allCustomers = this.lsService.getCustomers();
    let newCustomers = [];

    allCustomers.forEach(currentCustomer => {
      if (currentCustomer.id !== customerForDeleteId) {
        newCustomers.push(currentCustomer)
      }
    })
    
    this.lsService.setCustomers(newCustomers);
    this.customers = this.lsService.getCustomers();
  }

}
