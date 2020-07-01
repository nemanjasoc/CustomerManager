import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
    providedIn: 'root'
})

export class CommunicationService {
    customerDetails: Customer;
    
    private databaseDataHasChanged = new Subject<any>();


    constructor() { }
    

    databaseDataHasChangedObservable(): Observable<any> {
        return this.databaseDataHasChanged.asObservable();
    }
    
    databaseDataHasChangedNotify() {
        this.databaseDataHasChanged.next()
    }

    saveCustomerDetails(customerDetails: Customer) {
        this.customerDetails = customerDetails;
    }

}
