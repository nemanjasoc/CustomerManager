import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalStorageService } from '../service/local-storage.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  downloadJsonHref: any;
  fileName: any;
  selectedFile: File = null;
  importedCustomersString: any;
  importedCustomers: Customer[];

  constructor(private sanitizer: DomSanitizer,
    private lsService: LocalStorageService) {}


  downloadCustomersDB() {
    const dbContent = this.lsService.getCustomers();
    const theJSON = JSON.stringify(dbContent);

    const uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHref = uri;

    const timeStemp = new Date().toLocaleDateString()
    this.fileName = `CustomerDB_${timeStemp}.json`;
  }

  importCustomersDB(files) {
    this.selectedFile = files.item(0);
    const fileReader = new FileReader();
    
    fileReader.readAsText(this.selectedFile, "UTF-8");

    fileReader.onload = () => {
      this.importedCustomersString = fileReader.result;
      this.importedCustomers = JSON.parse(this.importedCustomersString)
      localStorage.setItem('customers', JSON.stringify(this.importedCustomers));
    }

    fileReader.onerror = (error) => {
      console.log(error);
    }
    
  }

}
