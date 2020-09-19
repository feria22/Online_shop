import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import {LocalStorageService} from '../local-storage.service';
import {Product} from '../interfaces';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  type = 'Phone';
  order$ = this.LSS.order$;
  cartProducts: Product[] = [] ;
  totalPrice = 0;
  constructor(
    private router: Router,
    private LSS: LocalStorageService,
    private prodServ: ProductService,
  ) { }

  ngOnInit() {
    this.order$.subscribe((value) => {
      this.cartProducts = Object.values(value);
      this.totalPrice = this.cartProducts.reduce(((a, item) => a + (item.price * item.qty)), 0);
    });
  }
  setType(type) {
    this.type = type;
    if (this.type !== 'Cart'){
      this.router.navigate(['/'], {
        queryParams: {
          type: this.type
        }
      });
      this.prodServ.setType(this.type);
    }
  }

}
