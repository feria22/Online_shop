import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/internal/operators/map';
import { FbResponse, Product } from './interfaces';
import { LocalStorageService } from './local-storage.service';
import {formatNumber} from '@angular/common';

;

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  type = 'Phone';
  // cartProducts: Product[] = this.cartProducts ? this.cartProducts : [];
  // private item: [] = [];
  // totalPrice: number = 0;

  constructor(
    private http: HttpClient,
    private LSS: LocalStorageService,
  ) {
  }

  create(product) {
    return this.http.post(`${environment.fbObUrl}/products.json`, product)
      .pipe(map((res: FbResponse) => {
        return {
          ...product,
          id: res.name,
          date: new Date(product.date)
        };
      }));
  }

  getALL() {
    return this.http.get(`${environment.fbObUrl}/products.json`)
      .pipe(map(res => {
        return Object.keys(res)
          .map(key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }));
      }));
  }

  getById(id) {
    return this.http.get(`${environment.fbObUrl}/products/${id}.json`)
      .pipe(map((res: Product) => {
        return {
          ...res,
          id,
          date: new Date(res.date)
        };
      }));
  }

  remove(id) {
    return this.http.delete(`${environment.fbObUrl}/products/${id}.json`);
  }

  update(product: Product) {
    return this.http.patch(`${environment.fbObUrl}/products/${product.id}.json`, product);
  }

  setType(type) {
    this.type = type;
  }

  AddProduct(id) {
    this.LSS.setLSS(id);
  }


}
