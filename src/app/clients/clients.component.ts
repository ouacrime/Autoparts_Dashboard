import { Component, inject, OnInit } from '@angular/core';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit {
  
  private clientService = inject(ClientService);

  clients: any[] = [];

  ngOnInit() {
  }


}
