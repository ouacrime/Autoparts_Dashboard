import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListClientsComponent } from './list-clients/list-clients.component';
import { AddClientComponent } from './add-client/add-client.component';
import { clientResolver } from './client-resolver';



const routes: Routes = [

  {
    path: 'list-clients',
    component: ListClientsComponent,
    resolve: {
      cliente: clientResolver
    }
  }
  ,
  {
    path: 'add-client',
    component: AddClientComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
