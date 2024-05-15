import { Component, OnInit } from '@angular/core';
import { Client } from '../../model/client.model';
import { NgForm } from '@angular/forms';
import { ClientService } from '../../service/client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.scss',
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    address: '',
    username: '',
    phoneNumber: '',
  };

  constructor(private clientService: ClientService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      
    }

  ngOnInit(): void {
    
  }

  saveClient(clientForm: NgForm): void {
    this.clientService.saveClient(this.client).subscribe(
      {
        next: (response : Client) =>{
          clientForm.reset();
          this.router.navigate(["../list-clients"]);
        },
        error: (error : HttpErrorResponse) =>{
          console.log(error);
        }
      }
    );
  }
}
