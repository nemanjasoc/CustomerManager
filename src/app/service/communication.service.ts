import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CommunicationService {
    
    private databaseDataHasChanged = new Subject<any>();
    

    databaseDataHasChangedObservable(): Observable<any> {
        return this.databaseDataHasChanged.asObservable();
    }
    
    databaseDataHasChangedNotify() {
        this.databaseDataHasChanged.next()
    }

}
