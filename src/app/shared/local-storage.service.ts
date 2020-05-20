import { Injectable } from '@angular/core';
// import { Product } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public productsInCart: Array<string>;
  private id: string;
  constructor() { }
  init() {
    // console.log('init')
    if (localStorage.getItem('productsInCart') === null) {
      this.productsInCart = [];
    }
    else { this.productsInCart = JSON.parse(localStorage.getItem('productsInCart')); }
    console.log( this.productsInCart)

  }
  setLSS(id) {
    // console.log(' setLSS')
    this.init();
    this.productsInCart.push(id);
    localStorage.setItem('productsInCart', JSON.stringify(this.productsInCart));
  }
}
