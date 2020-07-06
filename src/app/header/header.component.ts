import { Component, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from '../service/local-storage.service';
import { FileService } from '../service/file.service';
import { CommunicationService } from '../service/communication.service';
import { ConfirmDialogComponent, ConfirmDialogData } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  downloadJsonHref: any;
  fileName: any;

  @ViewChild('myFileInput') myFileInput;
  

  constructor(public dialog: MatDialog,
    public communicationService: CommunicationService,
    private sanitizer: DomSanitizer,
    private lsService: LocalStorageService,
    private fileService: FileService) { }


  downloadCustomersDB() {
    const dbContent = this.lsService.getCustomers();
    const theJSON = JSON.stringify(dbContent);

    const uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHref = uri;

    const timeStemp = new Date().toLocaleDateString()
    this.fileName = `CustomerDB_${timeStemp}.json`;
  }

  openCustomersImportDialog(files) {
    let lsCustomers = this.lsService.getCustomers();

    if (lsCustomers.length > 0) {
      this.dialog.open(ConfirmDialogComponent, {
        data: <ConfirmDialogData>{
          title: `Import Data Base`,
          subtitle: `Do you want remove old data before import new one?`,
        }
      }).afterClosed().subscribe((result) => {
        this.fileService.getFileContent(files[0]).subscribe(data => {
          if (result) {
            this.lsService.setCustomers(data);
          } else {
            this.lsService.addNewImportedCustomers(data);
          }
          this.communicationService.databaseDataHasChangedNotify();
        });

        this.myFileInput.nativeElement.value = '';
      });
    }
    else {
      this.dialog.open(ConfirmDialogComponent, {
        data: <ConfirmDialogData>{
          title: `Import Data Base`,
        }
      }).afterClosed().subscribe((result) => {
        this.fileService.getFileContent(files[0]).subscribe(data => {
          if (result) {
            this.lsService.setCustomers(data);
          }
          this.communicationService.databaseDataHasChangedNotify();
        });
        this.myFileInput.nativeElement.value = '';
      });
    }
  }

}
