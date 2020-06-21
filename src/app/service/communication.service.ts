import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';

@Injectable({
    providedIn: 'root'
})

export class CommunicationService {
    editCustomerIsOpen = false;
    customerForEdit: Customer;
    customerDetails: Customer;

    saveCustomerForEdit(customerForEdit: Customer) {
        this.customerForEdit = customerForEdit;
    }

    saveCustomerDetails(customerDetails: Customer) {
        this.customerDetails = customerDetails;
    }
}
