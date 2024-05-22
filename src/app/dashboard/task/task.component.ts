import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../service/task.service';
import { Client } from '../../model/client.model';
import { Task } from '../../model/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  editTaskValue = '';
  choseClient: FormGroup;
  clients: Client[] = [];
  taskObj = new Task();

  constructor(
    public dialogRef: MatDialogRef<TaskComponent>,
    private taskService: TaskService,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, clients: Client[] }
  ) {
    this.choseClient = this._formBuilder.group({
      client: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.clients = this.data.clients;
    this.loadTaskDetails();
  }

  private loadTaskDetails(): void {
    this.taskService.getTaskById(this.data.id).subscribe({
      next: (res: Task) => {
        this.taskObj = res;
        this.editTaskValue = res.task;
        this.choseClient.patchValue({ client: res.clientId });
      },
      error: (error) => {
        console.error('Error fetching task details:', error);
      }
    });
  }

  editTask(): void {
    this.taskObj.task = this.editTaskValue;
    this.taskObj.clientId = this.choseClient.get('client')?.value;

    this.taskService.updateTask(this.data.id, this.taskObj).subscribe({
      next: () => {
        this.dialogRef.close(); // Close the dialog on success
      },
      error: (err) => {
        console.error('Error while updating task:', err); // Log the error for debugging
        alert('Error while updating task');
      }
    });
  }
}
