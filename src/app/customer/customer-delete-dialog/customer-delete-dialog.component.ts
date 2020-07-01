import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer.model';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
    templateUrl: './customer-delete-dialog.component.html',
    styleUrls: ['./customer-delete-dialog.component.scss']
})
export class CustomerDeleteDialogComponent {
    customer: Customer;


    constructor(public dialogRef: MatDialogRef<CustomerDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Customer,
        private lsService: LocalStorageService) {
        
        if (data) {
            this.customer = data;
        }
        
    }
    

    onClickDelete() {
        this.lsService.deleteCustomer(this.customer.id);
        this.dialogRef.close(true);
    }

}
