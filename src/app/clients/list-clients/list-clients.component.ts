import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { Client } from '../../model/client.model';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.scss'
})
export class ListClientsComponent implements OnInit {

  dataSource : Client[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'phoneNumber','username','statusName'];


  constructor(private clientService : ClientService) { 
    this.getClientsList();
  }

  ngOnInit(): void {
    
  }

  getClientsList(): void {
    this.clientService.getClients().subscribe(
      {
        next: (res: Client[]) =>
        {
          this.dataSource = res;
        },
        error: (e : HttpErrorResponse) => {
          console.error(e)
        }
      });
  }



}
