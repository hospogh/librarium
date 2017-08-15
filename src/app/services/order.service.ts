import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {IOrder} from '../defines/IOrder';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) {

  }
  getUserOrders() {
    console.log('getUserOrders from service');
    return this.http.get(`/api/user/history`) as Observable<IOrder[]>;
  }

}