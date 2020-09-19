import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import {Product} from '../shared/interfaces';
import {LocalStorageService} from '../shared/local-storage.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderService} from '../shared/order.service';
import { take } from 'rxjs/internal/operators/take';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartProducts: Product[] = [] ;
  totalPrice = 0;
  form: FormGroup;
  submitted = false;
  order$ = this.LSS.order$;
  added = '';
  constructor(
    private prodServ: ProductService,
    private LSS: LocalStorageService,
    private orderService: OrderService
  ) {
  }
    ngOnInit() {
     this.order$.subscribe((value) => {
        this.cartProducts = Object.values(value);
        this.totalPrice = this.cartProducts.reduce(((a, item) => a + item.price * item.qty), 0);
      });
     this.form = new FormGroup({
        name: new FormControl(null, Validators.required),
        phone: new FormControl(null, Validators.required),
        adress: new FormControl(null, Validators.required),
        payment: new FormControl('Cash')
      });
    }
  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      adress: this.form.value.adress,
      orders: this.cartProducts,
      payment:  this.form.value.payment,
      price: this.totalPrice,
      date: new Date()
    };

    this.orderService.create(order)
      .pipe(take(1))
      .subscribe(() => {
        this.form.reset();
        this.submitted = false;
        this.cartProducts = [];
        this.added = 'Thank you, your order has been placed';
        this.LSS.deleteAll();
      }
    );
}

  delete(product) {
    this.totalPrice -= +product.price;
    this.LSS.unsetLSS(product.id);

  }

  incrementItem(id: string) {
    this.LSS.incrementItem(id);
  }

  decrementItem(id: string) {
    this.LSS.decrementItem(id);
  }

}
