// product.model.ts
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    comparePrice: number;
    quantity: number;
    visibility: string;
    productImagePath: string;
    categoryId: number;
    categoryName?: string; // Optional because it is derived from the Category entity
    dateCreated: string;
    dateUpdated: string;
  }
  