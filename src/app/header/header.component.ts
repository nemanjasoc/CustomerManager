import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalStorageService } from '../service/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomersImportDialogComponent } from '../customers/customers-import-dialog/customers-import-dialog.component';
import { CommunicationService } from '../service/communication.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  downloadJsonHref: any;
  fileName: any;

  constructor(public dialog: MatDialog,
    public communicationService: CommunicationService,
    private sanitizer: DomSanitizer,
    private lsService: LocalStorageService) {}

  
  downloadCustomersDB() {
    const dbContent = this.lsService.getCustomers();
    const theJSON = JSON.stringify(dbContent);

    const uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHref = uri;

    const timeStemp = new Date().toLocaleDateString()
    this.fileName = `CustomerDB_${timeStemp}.json`;
  }

  openCustomersImportDialog(files) {
    this.dialog.open(CustomersImportDialogComponent, {
      width: '400px',
      height: '180px',
      data: files
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.communicationService.databaseDataHasChangedNotify();
      }
    });
  }

}
