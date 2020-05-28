import { Injectable } from '@angular/core';
import { Product } from './interfaces';
import { Order} from './interfaces';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private productsInCart: Array<any> = JSON.parse(localStorage.getItem('productsInCart')) || {};
  public order$ = new BehaviorSubject(this.productsInCart);
  constructor(
  ) {
  }
  incrementItem(id){
    this.productsInCart[id].qty++;
    localStorage.setItem('productsInCart', JSON.stringify(this.productsInCart));
    this.order$.next(this.productsInCart);
  }
  decrementItem(id){
    if( this.productsInCart[id].qty>1) {
      this.productsInCart[id].qty--;
    }
    else {return null}
    localStorage.setItem('productsInCart', JSON.stringify(this.productsInCart));
    this.order$.next(this.productsInCart);

  }
  setLSS(product: Product ) {
    const order: Order =
      {
        id: product.id,
        type: product.type,
        title: product.title,
        price: product.price,
        qty: 1
      };
    if (!this.productsInCart[product.id]) {
      this.productsInCart[product.id] = order;
    } else {
      this.productsInCart[product.id].qty++;

    }
    localStorage.setItem('productsInCart', JSON.stringify(this.productsInCart));
    this.order$.next(this.productsInCart);

  }
  unsetLSS(id: string){
    delete this.productsInCart[id];
    localStorage.setItem('productsInCart', JSON.stringify(this.productsInCart));
    this.order$.next(this.productsInCart);
  }
  deleteAll(){
    localStorage.removeItem('productsInCart');
    this.productsInCart = {};
    this.order$.next(this.productsInCart);
  }

}
