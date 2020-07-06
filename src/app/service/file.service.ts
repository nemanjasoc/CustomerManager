import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})

export class FileService {

  getFileContent(file: File): Observable<Customer[]> {
    return new Observable(subscriber => {
      const fileReader = new FileReader();

      fileReader.onload = (result) => {
        try {
          const customers = JSON.parse(result.target.result as string);

          subscriber.next(customers);
          subscriber.complete();
        } catch (error) {
          subscriber.next([]);
          subscriber.complete();
        }

      }
      fileReader.readAsText(file);
    });
  }

}
