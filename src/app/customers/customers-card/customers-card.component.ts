import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerEditDialogComponent } from 'src/app/customer/customer-edit/customer-edit-dialog.component';
import { Customer } from 'src/app/models/customer.model';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { CommunicationService } from 'src/app/service/communication.service';

@Component({
  templateUrl: './customers-card.component.html',
  styleUrls: ['./customers-card.component.scss']
})
export class CustomersCardComponent implements OnInit {
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

  openEditDialog(customerForEdit: Customer) {
    console.log("customer from card: ", customerForEdit)
    
    this.communicationService.saveCustomerForEdit(customerForEdit);
    
    this.openDialog();

    this.communicationService.editCustomerIsOpen = true;
  }

}
