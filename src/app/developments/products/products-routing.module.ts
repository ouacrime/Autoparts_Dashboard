import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsComponent } from './components/products/add-product/add-products.component';
import { ProductsComponent } from './components/products/product-list/products.component';


export const routes: Routes = [
    {
        path: '',
        component: ProductsComponent

    },
    {
        path: 'AddProduct',
        component: AddProductsComponent
    }


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }
