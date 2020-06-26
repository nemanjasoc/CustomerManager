import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Customer } from '../models/customer.model';
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  customers: Customer[];
  downloadJsonHref: any;

  constructor(private sanitizer: DomSanitizer,
    private lsService: LocalStorageService) {}


  ngOnInit(): void {
    this.customers = this.lsService.getCustomers();
  }

  generateDownloadJsonUri() {
    var theJSON = JSON.stringify(this.customers);
    var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHref = uri;
  }

}
