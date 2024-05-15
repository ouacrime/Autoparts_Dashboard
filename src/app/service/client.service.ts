import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Client } from '../model/client.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  constructor(private httpclient: HttpClient) { }

  api = "http://localhost:9090/api"

  public saveClient(client: Client): Observable<Client>
  {
    return this.httpclient.post<Client>('http://localhost:9090/api/clients', client);

  }

  public getClients(): Observable<Client[]>
  {
    return this.httpclient.get<Client[]>('http://localhost:9090/api/clients');
  }


  




}
