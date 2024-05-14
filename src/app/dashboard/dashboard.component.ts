import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Tasks } from '../model/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  taskObj : Tasks = new Tasks();
  taskArr : Tasks[] = [];

  addTaskValue : string = "";
  editTaskValue : string = "";



  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.editTaskValue = "";
    this.addTaskValue = "";
    this.taskObj = new Tasks();
    this.taskArr = [];
    this.getAllTasks();

  }

  getAllTasks() {
    this.crudService.getAllTasks().subscribe(res => {
      this.taskArr = res;
    }, err => {
      alert("error while fetching the task");
    })
  }



  addTask() 
  { 
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTaskValue = "";
    }, err => {
      alert(err);
    })

  }

  editTask() 
  { 
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("failed to edit the task");
    })
  }

  deleteTask(etask : Tasks)
  {
    this.crudService.deletTask(etask).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("failed to delete the task");
    })

  }

  call(etask : Tasks)
  {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }







}
