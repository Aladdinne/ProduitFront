import {Component, OnInit} from '@angular/core';
import {Product} from "../model/Product";
import {ActivatedRoute} from "@angular/router";
import {ProductserviceService} from "../service/productservice.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{
  product=new Product();
  id!: string;
  constructor(private sv : ProductserviceService, private route: ActivatedRoute,private router: Router) {this.route.params.subscribe(params => {
    this.id = params['id'];
  });
  }
  ngOnInit() {
    this.sv.getProductById(this.id).subscribe(data=>this.product=data)
  }

  updateProduct(){
    this.sv.updateProduct(this.id,this.product).subscribe((modifier)=>this.router.navigate(['/products']),(error)=>console.log("error"));
  }
}
