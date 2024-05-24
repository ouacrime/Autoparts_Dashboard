import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgForm, FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../../model/category.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatSelectModule, MatInputModule, MatFormFieldModule, FormsModule],  // Ensure FormsModule is imported here
})
export class AddCategoryComponent implements OnInit {
  category: Category;
  imageInput: any;
  imageFile: File | null = null; // Initialize imageFile as null or provide a default image
  isUpdateMode: boolean = false;




  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.category = data.category || {
      id: null,
      name: '',
      visbility: '',  // Correct spelling
    };
  }

  ngOnInit(): void {
    console.log(this.category.id);
    if (this.category.id !== null) {
      console.log(this.category.id);
      this.isUpdateMode = true;
    }
  }

  addCategory(categoryForm: NgForm): void {
    console.log(this.category);

    if (categoryForm.valid) {
      this.categoryService.addCategoryWithImage(this.category, this.imageFile).subscribe(
        (response) => {
          console.log(response);
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          // Optionally handle error, e.g., show an error message
        }
      );
    }
  }

  updateCategory(): void {
    const formData = new FormData();
    formData.append('categoryDto', JSON.stringify(this.category));


    this.categoryService.updateCateory(this.category.id, this.category, this.imageFile).subscribe({
      next: (response: any) => {
        this.isUpdateMode = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error while updating category:', error);
        alert('Error while updating category.');
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  onFileChange(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.imageFile = fileList[0];
    }
  }

  saveOrUpdateCategory(categoryForm: NgForm): void {
    if (this.category.id) {
      this.updateCategory();
      this.dialogRef.close(true);
    } else {
      this.addCategory(categoryForm);
    }
    categoryForm.reset();
  }

}
