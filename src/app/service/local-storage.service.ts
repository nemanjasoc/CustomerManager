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
    
    const findCustomer = customers.find(lsCustomer => customer.email === lsCustomer.email);

    if(!findCustomer) {
      customers.push(customer);
    } else {
      alert('Created customer email alredy exist in database!')
    }
    
    this.setCustomers(customers);
  }

  updateCustomer(customerForEdit: Customer) {
    let allCustomers = this.getCustomers();
    let newCustomers = [];

    allCustomers.forEach(currentCustomer => {
      if (currentCustomer.id === customerForEdit.id && currentCustomer.email !== customerForEdit.email) {
        newCustomers.push(customerForEdit)
      } else if (currentCustomer.email === customerForEdit.email) {
        alert('Created customer email alredy exist in database!')
        newCustomers.push(currentCustomer)
      } else {
        newCustomers.push(currentCustomer)
      }
 
    })

    this.setCustomers(newCustomers);
  }

  deleteCustomer(customer: Customer) {
    let lsCustomers = this.getCustomers();
    lsCustomers = lsCustomers.filter(lsCustomer => lsCustomer.email !== customer.email);
    this.setCustomers(lsCustomers);
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
      this.importedCustomers = JSON.parse(this.importedCustomersString);
    }

    fileReader.onerror = (error) => {
      console.log(error);
    } 
  }

  addNewImportedCustomers(customersForImport: Customer[]) {
    const lsCustomers = this.getCustomers(); 

    customersForImport.forEach(customer => {
      const findCustomer = lsCustomers.find(lsCustomer => customer.email === lsCustomer.email);

      if(!findCustomer) {
        lsCustomers.push(customer);
      }
    });

    this.setCustomers(lsCustomers);
  }

}
