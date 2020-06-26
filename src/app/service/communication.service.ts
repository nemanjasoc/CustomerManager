import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
    providedIn: 'root'
})

export class CommunicationService {
    customerDetails: Customer;
    
    private newCustomerIsAdded = new Subject<string>();


    constructor() { }
    

    newCustomerIsAddedObservable(): Observable<string> {
        return this.newCustomerIsAdded.asObservable();
    }
    
    newCustomerIsAddedNotify() {
        this.newCustomerIsAdded.next()
    }

    saveCustomerDetails(customerDetails: Customer) {
        this.customerDetails = customerDetails;
    }

}
