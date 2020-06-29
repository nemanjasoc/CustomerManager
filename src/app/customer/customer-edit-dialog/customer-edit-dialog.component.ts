import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from '../../models/customer.model';
import { LocalStorageService } from '../../service/local-storage.service';

@Component({
  templateUrl: './customer-edit-dialog.component.html',
  styleUrls: ['./customer-edit-dialog.component.scss']
})
export class CustomerEditDialogComponent {
  customer: Customer;
  isEditMode: boolean;


  constructor(public dialogRef: MatDialogRef<CustomerEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    private lsService: LocalStorageService) {

      if(data) {
        this.customer = data;
        this.isEditMode = true;
      } else {
        this.customer = new Customer();
        this.isEditMode = false;
      }
  }

  
  onClickSave() {
    if(this.isEditMode) {
      this.lsService.updateCustomer(this.customer);
    } else {
      this.lsService.saveCustomer(this.customer);
    }
    this.dialogRef.close(true);
  }

}
