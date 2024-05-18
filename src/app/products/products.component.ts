import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from './add-category.component';
import { Category } from '../model/category.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../service/category.service';
import { ProductService } from '../service/product.service';

import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, AfterViewInit {
  
  dataSourceProducts: MatTableDataSource<Product> =
    new MatTableDataSource<Product>([]);
  product: any;

  dataSourceCategory: MatTableDataSource<Category> =
    new MatTableDataSource<Category>([]);
  category: any;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selectedTabIndex = 0;

  constructor(
    public dialog: MatDialog,
    private CategoryService: CategoryService,
    private ProductService: ProductService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.getCategoryList();
    this.getProductsList();
  }

  

  ngOnInit(): void {
    this.category = this.activateRoute.snapshot.data['category'];
    this.product = this.activateRoute.snapshot.data['product'];
  }

  ngAfterViewInit(): void {
    this.dataSourceProducts.paginator = this.paginator;
    this.dataSourceProducts.sort = this.sort;

    this.dataSourceCategory.paginator = this.paginator;
    this.dataSourceCategory.sort = this.sort;
  }

  onTabChange(event: any): void {
    this.selectedTabIndex = event.index;
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(AddCategoryComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


  viewMore(row: Product): void {
    // Implement the logic to view more details of the product
    console.log('View more:', row);
  }

  editProduct(row: Product): void {
    // Implement the logic to edit the product
    console.log('Edit:', row);
  }

  deleteProduct(row: Product): void {
    // Implement the logic to delete the product
    console.log('Delete:', row);
  }




  

  displayedColumnsProducts: string[] = [
    'id',
    'name',
    'description',
    'price',
    'comparePrice',
    'quantity',
    'visibility',
    'categoryName',
    'viewMore',
    'edit',
    'delete',
  ];




  getProductsList(): void {
    this.ProductService.getProducts().subscribe({
      next: (res: Product[]) => {
        this.dataSourceProducts = new MatTableDataSource<Product>(res);
        this.dataSourceProducts.paginator = this.paginator;
        this.dataSourceProducts.sort = this.sort;
      },
      error: (e: HttpErrorResponse) => {
        console.error(e);
      },
    });
  }

  applyFilterProducts(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceProducts.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceProducts.paginator) {
      this.dataSourceProducts.paginator.firstPage();
    }
  }







  displayedColumnsCategory: string[] = [
    'id',
    'name',
    'visbility',
    'viewMore',
    'edit',
    'delete',
  ];
  


  getCategoryList(): void {
    this.CategoryService.getAllCategories().subscribe({
      next: (res: Category[]) => {
        this.dataSourceCategory = new MatTableDataSource<Category>(res);
        this.dataSourceCategory.paginator = this.paginator;
        this.dataSourceCategory.sort = this.sort;
      },
      error: (e: HttpErrorResponse) => {
        console.error(e);
      },
    });
  }

  applyFilterCategory(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCategory.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceCategory.paginator) {
      this.dataSourceCategory.paginator.firstPage();
    }
  }


}
