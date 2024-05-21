import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tasks } from '../model//task';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TaskService {


  constructor(private httpclient: HttpClient) { }

  api = "http://localhost:9090/api/Tasks"


  getAllTasks(): Observable<Tasks[]> {
    return this.httpclient.get<Tasks[]>(this.api);
  }



}
