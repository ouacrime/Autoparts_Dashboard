import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';
import { StockManagementComponent } from './stock-management/stock-management.component';

const routes: Routes = [

    {
        path: 'list-products',
        component: ListProductsComponent
    },
    {
      path: 'stock-products',
      component: StockManagementComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
