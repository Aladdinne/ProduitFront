import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/Product";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  private baseUrl = 'http://localhost:1112/api/products';

  constructor(private http: HttpClient) { }

  createProduct(productDTO: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/createProduct`, productDTO);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/Products`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/Product/${id}`);
  }

  updateProduct(id: string, productDTO: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/update/${id}`, productDTO);
  }
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
  searchProducts(keyword: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/search?keyword=${keyword}`);
  }
}
