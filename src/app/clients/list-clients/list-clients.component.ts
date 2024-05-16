import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { Client } from '../../model/client.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.scss',
})
export class ListClientsComponent implements OnInit {
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



  }

  updateClient(clientId: number): void {
    console.log(clientId);
    this.selectedClientId = clientId;
    // Set isUpdateMode flag to true
    this.isUpdateMode = true;

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

  call(client: Client) {
    this.clientValue = client.firstName;
    this.clientValue = client.lastName;
    this.clientValue = client.address;
    this.clientValue = client.username;
    this.clientValue = client.phoneNumber;
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
      this.isUpdateMode = false;
      this.saveClient(clientForm);
    }
    clientForm.reset();
  }
}

