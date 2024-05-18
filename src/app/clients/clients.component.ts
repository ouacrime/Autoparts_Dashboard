import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../service/client.service';
import { Client } from '../model/client.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Client> = new MatTableDataSource<Client>([]);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  constructor(
    private clientService: ClientService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.clientValue = '';
    this.getClientsList();

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngOnInit(): void {
    this.client = this.activateRoute.snapshot.data['cliente'] || {
      id: null,
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      username: ''
    };
    console.log(this.client);


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
        this.dataSource = new MatTableDataSource<Client>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
