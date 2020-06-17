import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';

@Injectable({
    providedIn: 'root'
})

export class CommunicationService {
    editCustomerIsOpen = false;
    customer: Customer;

    saveCustomerForEdit(customerForEdit: Customer) {
        this.customer = customerForEdit;
    }
}
