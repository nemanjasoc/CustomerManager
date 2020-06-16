import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../../models/customer.model';
import { LocalStorageService } from '../../service/local-storage.service';


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
    private lsService: LocalStorageService) { }


  ngOnInit(): void {
  }

  onClickSave() {
    this.lsService.saveCustomer(this.customer);
    this.dialogRef.close();
  }

}
