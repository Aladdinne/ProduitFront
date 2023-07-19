import { Component } from '@angular/core';
import {Product} from "../model/Product";
import {ProductserviceService} from "../service/productservice.service";
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';


@Component({
  selector: 'app-creer-produit',
  templateUrl: './creer-produit.component.html',
  styleUrls: ['./creer-produit.component.css']
})
export class CreerProduitComponent {
  product= new Product();
  constructor(private sv:ProductserviceService,private router: Router) {
  }
  createProductt():void {
    console.log(this.product.name)
    this.sv.createProduct(this.product).subscribe(
      (createdProduct) => {
        this.router.navigate(['/products']);
        console.log('Product created:', createdProduct);
      },
      (error) => {
        console.error('Error creating product:', error);
      }
    );
  }

}
