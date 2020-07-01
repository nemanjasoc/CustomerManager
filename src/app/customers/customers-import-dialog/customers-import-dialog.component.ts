import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer.model';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
    templateUrl: './customers-import-dialog.component.html',
    styleUrls: ['./customers-import-dialog.component.scss']
})
export class CustomersImportDialogComponent {

    
    constructor(public dialogRef: MatDialogRef<CustomersImportDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private lsService: LocalStorageService) {

        if (data) {
            this.lsService.importCustomersDB(data);
        }

    }

    
    addNewData() {
        let oldCustomers = this.lsService.getCustomers();
        let importedCustomers = this.lsService.getImportedCustomers();

        for (let i = 0; i < importedCustomers.length; i++) {
            if (oldCustomers.indexOf(importedCustomers[i]) === -1) {
                oldCustomers.push(importedCustomers[i]);
            }
        }

        this.lsService.setCustomers(oldCustomers);

        this.dialogRef.close(true);
    }

    deleteOldAndImportNewData() {
        let importedCustomers = this.lsService.getImportedCustomers();
        this.lsService.setCustomers(importedCustomers);

        this.dialogRef.close(true);
    }

}
