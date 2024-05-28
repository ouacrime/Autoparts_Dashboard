import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './developments/dashboard/components/dashboard/dashboard.component';
import { StatisticsComponent } from './developments/statistics/statistics.component';
import { SettingsComponent } from './developments/settings/settings.component';
import { OrdersComponent } from './developments/orders/components/orders/orders.component';
import { InvoicesComponent } from './developments/invoices/components/invoice/invoices.component';
import { SuppliersComponent } from './developments/suppliers/suppliers.component';
import { ClientsComponent } from './developments/clients/components/client/clients.component';


const routes: Routes = [

  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},

  {path: 'clients', component: ClientsComponent},
  {
    path: 'products', 
    loadChildren: () => import('./developments/products/products.module').then(m => m.ProductsModule)
  },
  {path: 'statistics', component: StatisticsComponent},
  {
    path: 'coupens',
    loadChildren: () => import('./developments/coupens/components/coupen/coupens.module').then(m => m.CoupensModule)
  },

  {path: 'orders', component: OrdersComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'invoices', component: InvoicesComponent},
  {path: 'suppliers', component: SuppliersComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
