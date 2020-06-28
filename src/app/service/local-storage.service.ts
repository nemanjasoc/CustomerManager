import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';

const customerLSKey = 'customers';
const customerDetailsLSKey = 'customer';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  getCustomers(): Customer[] {
    let customers = localStorage.getItem(customerLSKey);

    return (customers) ? JSON.parse(customers) : [];
  }

  setCustomers(customers: Customer[]) {
    localStorage.setItem(customerLSKey, JSON.stringify(customers));
  }

  setCustomerDetails(customer: Customer) {
    localStorage.setItem(customerDetailsLSKey, JSON.stringify(customer));
  }

  getCustomerDetails(): Customer {
    let customer = localStorage.getItem(customerDetailsLSKey);

    return (customer) ? JSON.parse(customer) : [];
  }

  saveCustomer(customer: Customer) {
    const customers = this.getCustomers();
    customer.id = this.createId(customers);

    customers.push(customer);
    this.setCustomers(customers);
  }

  updateCustomer(customer: Customer) {
    let allCustomers = this.getCustomers();
    let customerForEdit = customer;
    let newCustomers = [];

    allCustomers.forEach(currentCustomer => {
        if (currentCustomer.id === customerForEdit.id) {
          newCustomers.push(customerForEdit)
        } else {
          newCustomers.push(currentCustomer)
        }
    })

    this.setCustomers(newCustomers);
  }

  deleteCustomer(id: number) {
    let allCustomers = this.getCustomers();
    allCustomers = allCustomers.filter(item => item.id !== id);
    this.setCustomers(allCustomers);
  }

  createId(data: any[]): number {
    let id = 0;
    data.forEach(item => {
      if (item.id > id) {
        id = item.id;
      }
    });

    return ++id;
  }

}
