import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, provideHttpClient,withFetch} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SettingsComponent } from './settings/settings.component';
import { SublevelMenuComponent } from './sidenav/sublevel-menu.component';
import { ClientsComponent } from './clients/clients.component';
import { OrdersComponent } from './orders/orders.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { HeaderComponent } from './header/header.component';

import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ListClientsComponent } from './clients/list-clients/list-clients.component';
import { AddClientComponent } from './clients/add-client/add-client.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';







@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    StatisticsComponent,
    SettingsComponent,
    SublevelMenuComponent,
    ClientsComponent,
    OrdersComponent,
    InvoicesComponent,
    SuppliersComponent,
    HeaderComponent,
    ListClientsComponent,
    AddClientComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    OverlayModule,
    CdkMenuModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,

  ],
  providers: [
    provideClientHydration(),    
    provideHttpClient(withFetch()), provideAnimationsAsync(), // Add this line to enable fetch

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
