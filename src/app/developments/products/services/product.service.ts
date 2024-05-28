import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
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







  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.api}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpclient.request(req);
  }

  getFiles(): Observable<any> {
    return this.httpclient.get(`${this.api}/files`);
  }
}


