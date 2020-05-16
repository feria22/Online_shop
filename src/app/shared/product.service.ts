import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/internal/operators/map';
import { FbResponse, Product } from './interfaces';

@Injectable({
  providedIn: 'root'
})
  
export class ProductService {

  constructor(private http: HttpClient) { }
  
  create(product) {
    return this.http.post(`${environment.fbObUrl}/products.json`, product)
      .pipe(map((res:FbResponse) => {
        return {
          ...product,
          id: res.name,
          date: new Date(product.date)
      }
    }))
  }

  getALL() {
    return this.http.get(`${environment.fbObUrl}/products.json`)
      .pipe(map(res => {
        return Object.keys(res)
          .map(key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
        }))
    }))
  };
  getById(id) {
    return this.http.get(`${environment.fbObUrl}/products/${id}.json`)
      .pipe(map ((res:Product)=> {
        return {
            ...res,
            id,
          date: new Date(res.date)
        }
        }))
    }
  
}