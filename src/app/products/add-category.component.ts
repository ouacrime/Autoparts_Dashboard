import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,MatSelectModule,MatInputModule,MatFormFieldModule],
})
export class AddCategoryComponent {
  constructor(public dialogRef: MatDialogRef<AddCategoryComponent>) {}

}
