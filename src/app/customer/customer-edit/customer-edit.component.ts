import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerForm } from './customer-edit';

@Component({
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {
  customer: CustomerForm =
    {
      id: 0,
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      address: '',
      city: '',
      state: ''
    }
  customers: CustomerForm[] = [];

  constructor() { }


  ngOnInit(): void {
  }

  onChangeGender(event) {
    this.customer.gender = event.target.value;
  }

  generateID() {
    var max = 0;

    for (var i = 0; i < this.customers.length; i++) {
        var currentCustomer = this.customers[i];

        if (currentCustomer.id > max) {
            max = currentCustomer.id;
        }
    }

    this.customer.id = max + 1;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.customer = form.value;
      this.generateID();
      this.customers.push(this.customer)
      localStorage.setItem('customers', JSON.stringify(this.customers));
      console.log("customers in edit: ", this.customers)
    }
  }

}
