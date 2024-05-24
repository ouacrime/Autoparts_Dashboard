import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../../model/client.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AddClientComponent } from './add-clients/add-client.component';
import { MatDialog } from '@angular/material/dialog';

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
    private activateRoute: ActivatedRoute,
    public dialog: MatDialog,
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


  openDialog(id?: number): void {
    let dialogRef = null;
  
    if (id) {
      // Editing an existing client
      this.clientService.getClientById(id).subscribe({
        next: (client: Client) => {
          dialogRef = this.dialog.open(AddClientComponent, {
            width: '500px',
            data: { client }
          });
          dialogRef.afterClosed().subscribe(() => {
            this.getClientsList();
          });
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
    } else {
      // Adding a new client
      dialogRef = this.dialog.open(AddClientComponent, {
        width: '500px',
        data: { client: this.client },
      });
      dialogRef.afterClosed().subscribe(() => {
        this.getClientsList();
      });
    }
  }
  
  



}
