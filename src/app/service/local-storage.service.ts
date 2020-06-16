import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';

const customerLSKey = 'customers';

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

    saveCustomer(customer: Customer) {
        const customers = this.getCustomers();
        customer.id = this.createId(customers);

        customers.push(customer);
        this.setCustomers(customers);
    }

    createId(data: any[]): number {
        let id = 0;
        data.forEach(item => {
            if(item.id > id) {
                id = item.id;
            }
        });

        return ++id;
    }

}
