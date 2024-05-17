import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

interface Product {
  id: number;
  name: string;
  progress: number;
  fruit: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'progress', 'name', 'fruit', 'viewMore', 'edit', 'delete'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selectedTabIndex = 0;

  products: Product[] = [
    { id: 1, name: 'Product 1', progress: 40, fruit: 'Apple' },
    { id: 2, name: 'Product 2', progress: 60, fruit: 'Banana' },
    { id: 3, name: 'Product 3', progress: 20, fruit: 'Orange' },
    { id: 4, name: 'Product 4', progress: 80, fruit: 'Grape' },
    { id: 5, name: 'Product 5', progress: 90, fruit: 'Pineapple' },
    { id: 6, name: 'Product 6', progress: 50, fruit: 'Strawberry' },
    { id: 7, name: 'Product 7', progress: 30, fruit: 'Cherry' },
    { id: 8, name: 'Product 8', progress: 70, fruit: 'Watermelon' },
    { id: 9, name: 'Product 9', progress: 10, fruit: 'Lemon' },
    { id: 10, name: 'Product 10', progress: 100, fruit: 'Blueberry' },
    { id: 11, name: 'Product 11', progress: 55, fruit: 'Mango' },
    { id: 12, name: 'Product 12', progress: 65, fruit: 'Peach' },
    { id: 13, name: 'Product 13', progress: 45, fruit: 'Plum' },
    { id: 14, name: 'Product 14', progress: 25, fruit: 'Pear' },
    { id: 15, name: 'Product 15', progress: 85, fruit: 'Kiwi' },
    { id: 16, name: 'Product 16', progress: 75, fruit: 'Pomegranate' },
    { id: 17, name: 'Product 17', progress: 95, fruit: 'Raspberry' },
    { id: 18, name: 'Product 18', progress: 35, fruit: 'Blackberry' },
    { id: 19, name: 'Product 19', progress: 15, fruit: 'Papaya' },
    { id: 20, name: 'Product 20', progress: 5, fruit: 'Guava' },
    { id: 21, name: 'Product 21', progress: 60, fruit: 'Lychee' },
    { id: 22, name: 'Product 22', progress: 70, fruit: 'Tangerine' },
    { id: 23, name: 'Product 23', progress: 80, fruit: 'Passionfruit' },
    { id: 24, name: 'Product 24', progress: 40, fruit: 'Cantaloupe' },
    { id: 25, name: 'Product 25', progress: 90, fruit: 'Dragonfruit' },
    { id: 26, name: 'Product 26', progress: 50, fruit: 'Fig' },
    { id: 27, name: 'Product 27', progress: 30, fruit: 'Date' },
    { id: 28, name: 'Product 28', progress: 20, fruit: 'Coconut' },
    { id: 29, name: 'Product 29', progress: 85, fruit: 'Persimmon' },
    { id: 30, name: 'Product 30', progress: 95, fruit: 'Grapefruit' }
  ];

  constructor() {
    this.dataSource = new MatTableDataSource(this.products);
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onTabChange(event: any): void {
    this.selectedTabIndex = event.index;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
}


