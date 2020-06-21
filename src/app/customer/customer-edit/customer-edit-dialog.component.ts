import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../../models/customer.model';
import { LocalStorageService } from '../../service/local-storage.service';
import { CommunicationService } from 'src/app/service/communication.service';

@Component({
  templateUrl: './customer-edit-dialog.component.html',
  styleUrls: ['./customer-edit-dialog.component.scss']
})
export class CustomerEditDialogComponent implements OnInit {
  customer: Customer =
    {
      id: null,
      firstName: '',
      lastName: '',
      gender: 'male',
      email: '',
      address: '',
      city: '',
      state: ''
    }


  constructor(public dialogRef: MatDialogRef<CustomerEditDialogComponent>,
    public communicationService: CommunicationService,
    private lsService: LocalStorageService) { }


  ngOnInit(): void {
    if (this.communicationService.editCustomerIsOpen) {
      this.customer = this.communicationService.customerForEdit;
    }
  }

  onClickSave() {
    this.lsService.saveCustomer(this.customer);
    this.dialogRef.close();
  }

  onClickEditCustomer() {
    let allCustomers = this.lsService.getCustomers();
    let customerForEdit = this.customer;
    let newCustomers = [];

    allCustomers.forEach(currentCustomer => {
        if (currentCustomer.id === customerForEdit.id) {
          newCustomers.push(customerForEdit)
        } else {
          newCustomers.push(currentCustomer)
        }
    })
    
    this.lsService.setCustomers(newCustomers);

    this.dialogRef.close();
  }

  onClickDeleteCustomer() {
    let allCustomers = this.lsService.getCustomers();
    let customerForDelete = this.customer;
    let newCustomers = [];

    allCustomers.forEach(currentCustomer => {
        if (currentCustomer.id !== customerForDelete.id) {
          newCustomers.push(currentCustomer)
        }
    })
    
    this.lsService.setCustomers(newCustomers);

    this.dialogRef.close();
  }

}
