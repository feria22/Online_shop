import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartProducts=[]
  totalPrice=0
  constructor(
    private prodServ:ProductService,
  ) { }

  ngOnInit() {
    this.cartProducts = this.prodServ.cartProducts
    for (let i = 0; i < this.cartProducts.length; i++){
      this.totalPrice += +this.cartProducts[i].price
    }
      
  }

}
