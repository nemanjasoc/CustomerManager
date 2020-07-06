import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommunicationService } from '../service/communication.service';
import { CustomerEditDialogComponent } from '../customer/customer-edit-dialog/customer-edit-dialog.component';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {


    constructor(public router: Router,
        public dialog: MatDialog,
        public communicationService: CommunicationService) { }


    openAddNewCustomerDialog() {
        this.dialog.open(CustomerEditDialogComponent, {
            width: '500px',
            height: '500px',
        }).afterClosed().subscribe((result) => {
            if (result) {
                this.communicationService.databaseDataHasChangedNotify();
            }
        });
    }

}
