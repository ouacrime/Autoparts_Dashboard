import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, provideHttpClient,withFetch} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './developments/body/components/body/body.component';
import { SidenavComponent } from './developments/sidenav/sidenav.component';
import { DashboardComponent } from './developments/dashboard/components/dashboard/dashboard.component';
import { StatisticsComponent } from './developments/statistics/statistics.component';
import { SettingsComponent } from './developments/settings/settings.component';
import { SublevelMenuComponent } from './developments/sidenav/sublevel-menu.component';
import { ClientsComponent } from './developments/clients/components/client/clients.component';
import { OrdersComponent } from './developments/orders/components/orders/orders.component';
import { InvoicesComponent } from './developments/invoices/components/invoice/invoices.component';
import { SuppliersComponent } from './developments/suppliers/suppliers.component';
import { HeaderComponent } from './developments/header/components/header/header.component';
import { AddClientComponent } from './developments/clients/components/client/add-clients/add-client.component';
import { TaskComponent } from './developments/dashboard/components/dashboard/task/task.component';




import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { FormsModule, NgForm } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import {MatStepperModule} from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';












@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    StatisticsComponent,
    SettingsComponent,
    SublevelMenuComponent,
    OrdersComponent,
    InvoicesComponent,
    SuppliersComponent,
    HeaderComponent,
    TaskComponent,
    ClientsComponent,
    AddClientComponent,

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
    MatTabsModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSliderModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,

  ],
  providers: [
    provideClientHydration(),    
    provideHttpClient(withFetch()), provideAnimationsAsync(), // Add this line to enable fetch

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
