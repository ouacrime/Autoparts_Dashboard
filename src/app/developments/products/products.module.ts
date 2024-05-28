import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AddProductsComponent } from './components/products/add-product/add-products.component';
import { ProductsComponent } from './components/products/product-list/products.component'
import { HttpClientModule } from '@angular/common/http';


import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { FormsModule, NgForm } from '@angular/forms';
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
import { MatProgressBarModule } from '@angular/material/progress-bar';





@NgModule({
  declarations: [
    ProductsComponent,
    AddProductsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ProductsRoutingModule,
    OverlayModule,
    FormsModule,
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
    MatProgressBarModule

  ]
})
export class ProductsModule { }
