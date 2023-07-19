import {Component, OnInit} from '@angular/core';
import {ProductserviceService} from "../service/productservice.service";
import {Product} from "../model/Product";
// @ts-ignore
import { PaginationInstance } from 'ngx-pagination';
// @ts-ignore
import { PageChangedEvent } from 'ngx-bootstrap/pagination'
@Component({
  selector: 'app-display-product',
  templateUrl: './display-product.component.html',
  styleUrls: ['./display-product.component.css']
})
export class DisplayProductComponent implements OnInit{
  products: Product[] = [];
  searchKeyword!:string;
  constructor(private sv:ProductserviceService ) {
  }
  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.sv.getAllProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  Delete(id :string) {
   this.sv.deleteProduct(id).subscribe(
     (message)=>{
       alert("Ton produit est supprimé !");
       this.getAllProducts();
     },
     (error)=>{
     console.error('Error supprimer');
     }
     );
  }
  Search(keyword: string): void {
    this.sv.searchProducts(keyword).subscribe(
      (results: Product[]) => {
        this.products = results;
      },
      (error) => {
        console.error('Error occurred during product search:', error);
      }
    );
  }
}
