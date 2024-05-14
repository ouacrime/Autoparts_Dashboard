import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tasks } from '../model/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceURL : string;

  constructor(private http : HttpClient) {
    this.serviceURL = "http://localhost:3000/Tasks"
   }

   addTask(task : Tasks) : Observable<Tasks>{
    return this.http.post<Tasks>(this.serviceURL, task);
   }

   getAllTasks() : Observable<Tasks[]>{
    return this.http.get<Tasks[]>(this.serviceURL);
   }

   deletTask(task : Tasks) : Observable<Tasks>{
    return this.http.delete<Tasks>(this.serviceURL+'/'+task.id);
   }

   editTask(task : Tasks) : Observable<Tasks>{
    return this.http.put<Tasks>(this.serviceURL+'/'+task.id, task);
   }
   



}
