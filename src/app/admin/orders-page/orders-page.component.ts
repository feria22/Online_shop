import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import {OrderService} from '../../shared/order.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit, OnDestroy {
  orders = [];
  pSub: Subscription;
  rSub: Subscription;


  constructor(
    private ordersServ: OrderService
  ) { }

  ngOnInit() {
    this.pSub = this.ordersServ.getALL().subscribe(orders => {
      console.log(orders);
      this.orders = orders;
    });
  }
  remove(id) {
    this.rSub = this.ordersServ.remove(id).subscribe(
      () => {
        this.orders = this.orders.filter(order => order.id !== id);
      }
    );
  }
  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }



}

