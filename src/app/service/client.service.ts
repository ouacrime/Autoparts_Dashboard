import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Client } from '../model/client.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  constructor(private httpclient: HttpClient) { }

  api = "http://localhost:9090/api/clients"

  public saveClient(client: Client): Observable<Client>
  {
    return this.httpclient.post<Client>(this.api, client);

  }
  

  public getClientById(clientId: number): Observable<Client>
  {
    return this.httpclient.get<Client>(this.api+"/"+clientId);
  }



  public getClients(): Observable<Client[]>
  {
    return this.httpclient.get<Client[]>(this.api);
  }

  public deleteClient(clientId : number){
    return this.httpclient.delete(this.api+"/"+clientId);
  }
  
  public updateClient(clientId: number, client: Client): Observable<Client>{
    return this.httpclient.put<Client>(this.api+"/"+clientId, client)
  }



}
