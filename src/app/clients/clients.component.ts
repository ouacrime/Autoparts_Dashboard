import { Component, OnInit } from '@angular/core';
import { ClientService } from '../service/client.service';
import { Client } from '../model/client.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit {
  dataSource: Client[] = [];
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'phoneNumber',
    'username',
    'statusName',
    'edit',
    'delete',
  ];
  clientValue: string = '';
  client: any;

  isUpdateMode: boolean = false;

  selectedClientId: number | null = null; // Store the ID of the selected client



  constructor(
    private clientService: ClientService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.clientValue = '';
    this.getClientsList();

  }

  ngOnInit(): void {
    this.client = this.activateRoute.snapshot.data['cliente'];
    console.log(this.client);
    this.client = {
      id: null,
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      username: ''
    };


  }
  addClient(): void {
    this.isUpdateMode = false;
  }


  updateClient(clientId: number): void {
    console.log(clientId);
    this.selectedClientId = clientId;
    // Set isUpdateMode flag to true
    this.isUpdateMode = true;
    this.clientService.getClientById(clientId).subscribe({
      next: (response: Client) => {
        this.client = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  getClientsList(): void {
    this.clientService.getClients().subscribe({
      next: (res: Client[]) => {
        this.dataSource = res;
      },
      error: (e: HttpErrorResponse) => {
        console.error(e);
      },
    });
  }

  deletClient(clientId: number): void {
    console.log(clientId);
    this.clientService.deleteClient(clientId).subscribe({
      next: (res) => {
        this.getClientsList();
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
      },
    });
  }

  saveClient(clientForm: NgForm): void {

    this.clientService.saveClient(this.client).subscribe({
      next: (response: Client) => {
        this.getClientsList();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });

  }

  saveOrUpdateClient(clientForm: NgForm): void {
    if (this.isUpdateMode && this.selectedClientId) {
      console.log(this.selectedClientId);
      this.clientService.updateClient(this.selectedClientId, this.client).subscribe({
        next: (response: Client) => {
          this.getClientsList();
          this.isUpdateMode = false;
          this.selectedClientId = null;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
    } else {
      this.saveClient(clientForm);
    }
    clientForm.reset();
  }


}
