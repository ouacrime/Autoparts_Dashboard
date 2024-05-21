import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Tasks } from '../../model/task';
import { CrudService } from '../../service/crud.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
  editTaskValue: string="";
  taskArr: Tasks[] = [];
  taskObj: Tasks = new Tasks();


  constructor(public dialogRef: MatDialogRef<TaskComponent>,private crudService: CrudService) {}

  ngOnInit(): void {
    this.editTaskValue = "";
    this.taskObj = new Tasks();
    this.taskArr = [];

  }


  getAllTasks() {
    this.crudService.getAllTasks().subscribe(res => {
      this.taskArr = res;
    }, err => {
      alert("error while fetching the task");
    });
  }


  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("failed to edit the task");
    });
  }
  
}
