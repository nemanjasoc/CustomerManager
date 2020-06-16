import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from './customer.model';

@Component({
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {
  customer: Customer =
    {
      id: 0,
      firstName: '',
      lastName: '',
      gender: 'male',
      email: '',
      address: '',
      city: '',
      state: ''
    }
  customers: Customer[] = [];

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
      localStorage.setItem('customer', JSON.stringify(this.customer));
      console.log("customers in edit: ", this.customers)
    }
  }

}
