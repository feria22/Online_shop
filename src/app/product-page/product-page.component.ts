import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  product$
  constructor(
    private prodServ: ProductService,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.product$ = this.route.params
      .pipe(switchMap(params => {

        return this.prodServ.getById(params['id'])
      }

      )
    )
    // console.log( this.product$)
  }
  AddProduct(product) {
  this.prodServ.AddProduct(product)
}
}
