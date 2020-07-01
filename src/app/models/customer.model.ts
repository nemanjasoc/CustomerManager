export class Customer {
    [x: string]: any;
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    address: string;
    city: string;
    state: string;


    constructor() {
      this.gender = 'male';
    }

}
