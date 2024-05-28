import { Component, Inject, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../../model/client.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientsComponent } from '../clients.component';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.scss'
})
export class AddClientComponent implements OnInit {
  client: Client;
  isUpdateMode: boolean = false;


  constructor(
    private clientService: ClientService,
    public dialogRef: MatDialogRef<ClientsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.client = data.client || {
      id: null,
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      username: ''
    };
  }


  ngOnInit(): void {
    if (this.client.id !== null) {
      this.isUpdateMode = true;
    }
  }



  saveClient(clientForm: NgForm): void {

    this.clientService.saveClient(this.client).subscribe({
      next: (response: Client) => {
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });

  }

  saveOrUpdateClient(clientForm: NgForm): void {
    if (this.client.id !== null) {
      console.log(this.client.id);
      this.clientService.updateClient(this.client.id, this.client).subscribe({
        next: (response: Client) => {
          this.isUpdateMode = false;
          this.dialogRef.close();
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error while updating client:', error); // Log the error for debugging
          alert('Error while updating client.');
        },
      });
    } else {
      console.log("clientForm");
      this.saveClient(clientForm);
    }
    clientForm.reset();
  }


}
