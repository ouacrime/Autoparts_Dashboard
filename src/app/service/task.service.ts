import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model//task';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TaskService {


  constructor(private httpclient: HttpClient) { }

  api = "http://localhost:9090/api/Tasks"


  getAllTasks(): Observable<Task[]> {
    return this.httpclient.get<Task[]>(this.api);
  }

  saveTask(task: Task): Observable<Task> {
    return this.httpclient.post<Task>(this.api, task);
  }


  deleteTask(id: number): Observable<Task> {
    return this.httpclient.delete<Task>(this.api + "/" + id);
  }

  public updateTask(taskId: number, task: Task): Observable<Task>{
    return this.httpclient.put<Task>(this.api+"/"+taskId, task)
  }

  public getTaskById(taskId: number): Observable<Task>{
    return this.httpclient.get<Task>(this.api+"/"+taskId)
  }



}
