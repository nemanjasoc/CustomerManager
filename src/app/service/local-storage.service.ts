import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';

const customerLSKey = 'customers';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  selectedFile: File = null;
  importedCustomersString: any;
  importedCustomers: Customer[];

  getCustomers(): Customer[] {
    let customers = localStorage.getItem(customerLSKey);

    return (customers) ? JSON.parse(customers) : [];
  }

  setCustomers(customers: Customer[]) {
    localStorage.setItem(customerLSKey, JSON.stringify(customers));
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

  importCustomersDB(files) {
    this.selectedFile = files.item(0);
    const fileReader = new FileReader();
    
    fileReader.readAsText(this.selectedFile, "UTF-8");

    fileReader.onload = () => {
      
      this.importedCustomersString = fileReader.result;
      this.importedCustomers = JSON.parse(this.importedCustomersString)
      
    }

    fileReader.onerror = (error) => {
      console.log(error);
    } 
  }

  addNewImportedCustomers(customers: Customer[]) {
    const lsCustomers = this.getCustomers(); 
    customers.forEach(customer => {
      const findCustomer = lsCustomers.find(lsCustomer => customer.id === lsCustomer.id);

      if(!findCustomer) {
        lsCustomers.push(customer);
      }
    });

    this.setCustomers(lsCustomers);
  }

}
