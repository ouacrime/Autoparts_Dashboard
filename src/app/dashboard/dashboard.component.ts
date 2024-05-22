import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../service/client.service';
import { Task } from '../model/task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../service/task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Client } from '../model/client.model';
import { MatStepper } from '@angular/material/stepper';
import { TaskComponent } from './task/task.component';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MyErrorStateMatcher } from '../Exception/MyErrorStateMatcher';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  taskObj: Task = new Task();
  taskArr: Task[] = [];
  clients: Client[] = [];
  choseTask: FormGroup;
  choseClient: FormGroup;
  FormNotes: FormGroup;
  formCompleted: boolean = false;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  matcher = new MyErrorStateMatcher();

  @ViewChild('stepper') stepper!: MatStepper;

  constructor(
    private clientService: ClientService,
    private taskService: TaskService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.choseTask = this._formBuilder.group({
      selected: ['', [Validators.required, Validators.pattern('^(credit|note)$')]],
      client: ['']
    });
    this.choseClient = this._formBuilder.group({
      client: ['', Validators.required]
    });
    this.FormNotes = this._formBuilder.group({
      note: ['', Validators.required]
    });
  }

  openDialog(taskId: number): void {
    const dialogRef = this.dialog.open(TaskComponent, {
      width: '500px',
      data: { id: taskId, clients: this.clients }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getTasksList();
    });
  }

  ngOnInit(): void {
    this.taskObj = new Task();
    this.taskArr = [];
    this.fetchClients(); // Fetch clients when component initializes
    this.getTasksList();
    this.subscribeToValueChanges();
  }

  getClientName(clientId: number): string {
   
    const client = this.clients.find(c => c.id === clientId);
    return client ? client.lastName + ' ' + client.firstName : '';
  }

  ngAfterViewInit(): void {
    this.stepper = this.stepper;
  }

  fetchClients(): void {
    this.clientService.getClients().subscribe({
      next: (res: Client[]) => {
        this.clients = res;
      },
      error: (e: HttpErrorResponse) => {
        console.error(e);
      },
    });
  }

  getTasksList(): void {
    this.taskService.getAllTasks().subscribe({
      next: (res: Task[]) => {
        this.taskArr = res;
        console.log(this.taskArr); // Log the task array
      },
      error: (e: HttpErrorResponse) => {
        console.error(e);
      },
    });
  }

  addTask(): void {
    this.taskObj.task = this.FormNotes.get('note')?.value;
    this.taskObj.clientId = this.choseClient.get('client')?.value;
    this.taskService.saveTask(this.taskObj).subscribe(() => {
      this.ngOnInit();
      this.FormNotes.get('note')?.reset(); // Reset the form control after task is added
    }, err => {
      alert(err);
    });
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id).subscribe(() => {
      this.ngOnInit();
    }, err => {
      alert('Failed to delete the task');
    });
  }

  subscribeToValueChanges(): void {
    this.choseTask.get('selected')?.valueChanges.subscribe(value => {
      if (value === 'note' && this.choseTask.get('selected')?.valid) {
        console.log(value);
      } else {
        console.log(value);
      }
    });

    this.choseClient.get('client')?.valueChanges.subscribe(value => {
      if (value === this.choseClient.get('client')?.value && this.choseClient.get('client')?.valid) {
        console.log(value);
      }
    });
  }

  markAsDone(): void {
    if (this.FormNotes.valid) {
      this.formCompleted = true;
      this.stepper.steps.forEach(step => step.completed = true);
      setTimeout(() => this.resetForm(), 3000); // Optionally reset the form after 3 seconds
    }
  }

  resetForm(): void {
    this.formCompleted = false;
    this.stepper.reset();
  }
}
