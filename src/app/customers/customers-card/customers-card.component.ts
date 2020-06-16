import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerEditComponent } from 'src/app/customer/customer-edit/customer-edit.component';
import { Customer } from 'src/app/customer/customer-edit/customer.model';

@Component({
  templateUrl: './customers-card.component.html',
  styleUrls: ['./customers-card.component.scss']
})
export class CustomersCardComponent implements OnInit {
  customers: Customer[] = [];


  constructor(public dialog: MatDialog) { }


  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(CustomerEditComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      this.customers = JSON.parse(localStorage.getItem('customers'));
      console.log("customers in card: ", this.customers)
    });
  }

}
