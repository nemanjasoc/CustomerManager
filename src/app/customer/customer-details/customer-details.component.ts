import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  customers: Customer[] = [];


  constructor(private lsService: LocalStorageService) { }
  

  ngOnInit(): void {
    this.customers = this.lsService.getCustomers();
  }

}
