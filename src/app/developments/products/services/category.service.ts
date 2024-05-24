import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  addCategory(category: Category, arg1: null) {
    throw new Error('Method not implemented.');
  }

  constructor(private httpclient: HttpClient) { }

  api = "http://localhost:9090/api/categories"


  getAllCategories(): Observable<Category[]> {
    return this.httpclient.get<Category[]>(this.api);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.httpclient.get<Category>(this.api + "/" + id);
  }

  addCategoryWithImage(category: Category, image: File | null): Observable<Category> {
    const formData: FormData = new FormData();
    formData.append('categoryDto', JSON.stringify(category));
    if (image !== null) {
      formData.append('image', image);
    }

    return this.httpclient.post<Category>(this.api, formData, {
        headers: new HttpHeaders({
            'Accept': 'application/json'
        })
    });
}

  updateCateory(id:number,category:Category, image: File | null):Observable<Category>{
    const formData: FormData = new FormData();
    formData.append('categoryDto', JSON.stringify(category));
    if (image !== null) {
      formData.append('image', image);
    }

    return this.httpclient.put<Category>(this.api+"/"+id, formData, {
      headers: new HttpHeaders({
          'Accept': 'application/json'
      })
  });
  }

  deleteCategory(id:number){
    return this.httpclient.delete<Category>(this.api+"/"+id)
  }


}
