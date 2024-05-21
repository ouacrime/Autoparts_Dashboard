import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Tasks } from '../model/task';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../Exception/MyErrorStateMatcher';
import { MatStepper } from '@angular/material/stepper';
import { TaskComponent } from './task/task.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../service/task.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  taskObj: Tasks = new Tasks();
  taskArr: Tasks[] = [];
  addTaskValue: string = "";
  editTaskValue: string = "";
  taskArre: Tasks[] = [];





  choseTask: FormGroup;
  choseClient: FormGroup;
  FormNotes: FormGroup;
  clients: string[] = ['Client 1', 'Client 2']; // Example clients
  formCompleted: boolean = false; // Boolean to track completion

  @ViewChild('stepper') stepper!: MatStepper;

  constructor(private crudService: CrudService,private taskService: TaskService, private _formBuilder: FormBuilder,public dialog: MatDialog,
    ) {
    this.choseTask = this._formBuilder.group({
      selected: ['', [Validators.required, Validators.pattern('^(credit|note)$')]],
      client: [''] // Add client control here
    });
    this.choseClient = this._formBuilder.group({
      client: ['', Validators.required]
    });
    this.FormNotes = this._formBuilder.group({
      note: ['', Validators.required]
    });
  }


  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(TaskComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  getTasksList(): void {
    this.taskService.getAllTasks().subscribe({
      next: (res: Tasks[]) => {
        this.taskArre = res;
      },
      error: (e: HttpErrorResponse) => {
        console.error(e);
      },
    });
  }


  ngOnInit() {
    this.editTaskValue = "";
    this.addTaskValue = "";
    this.taskObj = new Tasks();
    this.taskArr = [];
    this.getAllTasks();
    this.getTasksList();

    this.choseTask.get('selected')?.valueChanges.subscribe(value => {
      if (value === 'note' && this.choseTask.get('selected')?.valid) {
        console.log(value); 
      } 
      else
      {
        console.log(value);
      }
    });


    this.choseClient.get('client')?.valueChanges.subscribe(value => {
      if (value === this.choseClient.get('client')?.value && this.choseClient.get('client')?.valid) {
        console.log(value);
      }
    });

  }
  

  ngAfterViewInit() {
    this.stepper = this.stepper;
  }

  getAllTasks() {
    this.crudService.getAllTasks().subscribe(res => {
      this.taskArr = res;
    }, err => {
      alert("error while fetching the task");
    });
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTaskValue = "";
    }, err => {
      alert(err);
    });
  }

  

  deleteTask(etask: Tasks) {
    this.crudService.deletTask(etask).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("failed to delete the task");
    });
  }

  call(etask: Tasks) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;

  selected = new FormControl('', [Validators.required, Validators.pattern('^(valid|credit|note)$')]);
  selectFormControl = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);
  nativeSelectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);
  matcher = new MyErrorStateMatcher();

  markAsDone() {
    if (this.FormNotes.valid) {
      this.formCompleted = true;
      this.stepper.steps.forEach(step => step.completed = true);
      setTimeout(() => this.resetForm(), 3000); // Optionally reset the form after 3 seconds
    }
  }

  resetForm() {
    this.formCompleted = false;
    this.stepper.reset();
  }

  
 
  
}







