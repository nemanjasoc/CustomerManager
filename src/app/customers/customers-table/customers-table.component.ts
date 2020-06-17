import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { Customer } from 'src/app/models/customer.model';
import { MatDialog } from '@angular/material/dialog';
import { CustomerEditDialogComponent } from 'src/app/customer/customer-edit/customer-edit-dialog.component';
import { CommunicationService } from 'src/app/service/communication.service';

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.scss']
})
export class CustomersTableComponent implements OnInit {
  customers: Customer[] = [];


  constructor(public dialog: MatDialog, 
    public communicationService: CommunicationService,
    private lsService: LocalStorageService) { }


  ngOnInit(): void {
    this.customers = this.lsService.getCustomers();
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
