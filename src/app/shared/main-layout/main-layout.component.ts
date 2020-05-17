import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  type="Phone"
  constructor(
    private router: Router,
    private prodServ:ProductService
    
  ) { }

  ngOnInit() {
  }
  setType(type) {
    this.type = type
    if (this.type!='Cart'){
      this.router.navigate(['/'], { 
        queryParams: {
          type: this.type
        }
      })
      this.prodServ.setType(this.type)
    }
  }

}
