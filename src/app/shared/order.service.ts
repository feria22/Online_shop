import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from './local-storage.service';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/internal/operators/map';
import {FbResponse, Product} from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private LSS: LocalStorageService,
  ) {
  }

  create(order) {
    return this.http.post(`${environment.fbObUrl}/orders.json`, order)
      .pipe(map((res: FbResponse) => {
        return {
          ...order,
          id: res.name,
          date: new Date(order.date)
        };
      }));
  }

  getALL() {
    return this.http.get(`${environment.fbObUrl}/orders.json`)
      .pipe(map(res => {
        return Object.keys(res)
          .map(key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }));
      }));
  }

  remove(id) {
    return this.http.delete(`${environment.fbObUrl}/orders/${id}.json`);
  }

}
