import {  ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { ClientService } from "../service/client.service";
import { Observable, of } from "rxjs";
import { Client } from "../model/client.model";
import { inject } from "@angular/core";

export const clientResolver: ResolveFn<any> = 
    (route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
        clientService: ClientService = inject(ClientService)): Observable<Client> => {
        
            const clientId = route.paramMap.get('id');

            

            if(clientId){
                
                return clientService.getClientById(Number(clientId));

            }else{
                const client: Client = {
                    firstName: '',
                    lastName: '',
                    address: '',
                    username: '',
                    phoneNumber: '',
                  };

                return of(client);

            }








    }
        


