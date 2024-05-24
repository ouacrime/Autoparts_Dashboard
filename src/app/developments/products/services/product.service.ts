import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../../model/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpclient: HttpClient) { }

  api = "http://localhost:9090/api/products"


  public getProducts(): Observable<Product[]>
  {
    return this.httpclient.get<Product[]>(this.api);
  }









}
