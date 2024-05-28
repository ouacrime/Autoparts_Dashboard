import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service'
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
 
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss'] // Change styleUrl to styleUrls
})
export class AddProductsComponent implements OnInit {
  
  currentFile?: File;
  progress = 0;
  message = '';

  fileName = 'Select File';
  fileInfos?: Observable<any>;

  constructor(private productService: ProductService) { }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Select File';
    }
  }

  upload(): void {
    if (this.currentFile) {
      this.productService.upload(this.currentFile).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.fileInfos = this.productService.getFiles();
          }
        },
        error: (err: any) => {
          console.log(err);
          this.progress = 0;

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }
        },
        complete: () => {
          this.currentFile = undefined;
        }
      });
    }
  }

  ngOnInit(): void {
    this.fileInfos = this.productService.getFiles();
  }

}
