import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import {Product} from '../shared/interfaces';
import {LocalStorageService} from '../shared/local-storage.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  constructor(
    private prodServ: ProductService,
    private LSS: LocalStorageService,
  ) { }
  cartProducts: Product[] = [] ;
  totalPrice: number = 0;

  ngOnInit() {
    // if (typeof this.cartProducts === 'undefined') {  this.cartProducts = []; }
    this.LSS.init();
      if (this.LSS.productsInCart.length!=this.cartProducts.length) {
        console.log(this.LSS.productsInCart.length,this.cartProducts.length)
        for (const id of this.LSS.productsInCart) {
          this.prodServ.getById(id).subscribe((res: Product) => {
            this.cartProducts.push(res);
            this.totalPrice += +res.price;
          });
        }
      }
  }

}
