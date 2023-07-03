import { Component, OnInit } from '@angular/core';
import { ExecutiveService } from '../services/executive.service';
import { Observable, map, of } from 'rxjs';
import { executiveData } from '../models/executive-data.model';
import { MatDialog } from '@angular/material/dialog';
import { ExecutiveFormComponent } from './executive-form/executive-form.component';
import { NotificationService } from '../services/notification.service';
import { ViewExecutiveComponent } from './view-executive/view-executive.component';

@Component({
  selector: 'app-executive-list',
  templateUrl: './executive-list.component.html',
  styleUrls: ['./executive-list.component.scss']
})
export class ExecutiveListComponent implements OnInit {
  displayedColumns: string[] = ["id", "name", "sysInitials", 'group'];
  executives$: Observable<executiveData[]> = of([]);

  constructor(
    private executiveService: ExecutiveService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit(): void {
    // Fetch executives and sort them by ID in descending order
    this.executives$ = this.executiveService.getExecutives().pipe(
      map(executives => executives.sort((a, b) => b.id - a.id))
    );
  }

  createExecutive(): void {
    // Open the executive form dialog
    const dialogRef = this.dialog.open(ExecutiveFormComponent, {
      width: '500px'
    });

    // Subscribe to dialog close event
    dialogRef.afterClosed().subscribe(result => {
      // Check if a result is available (dialog was closed with valid data)
      if(Object.keys(result).length > 0) {
        // Create the executive using the executive service
        this.executiveService.createExecutive(result).subscribe({
          next: data => {
            this.notificationService.openSnackBar('Executive created successfully', 'Close');
            this.ngOnInit();
          },
          error: error => {
            console.error('There was an error!', error);
          },
          complete: () => { }
        });
      }
    });
  }

  // Custom trackBy function for ngFor directive
  // It returns a unique identifier for each executiveData item
  // This is needed for the Angular change detection mechanism to improve performance
  trackByFn(index: number, item: executiveData): number {
    return item.id;
  }

  viewExecutiveDetails(executive: executiveData): void {
    // Open the view executive component dialog
    const dialogRef = this.dialog.open(ViewExecutiveComponent, {
      width: '500px',
      data: {
        executive: executive
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(Object.keys(result).length > 0) {
        this.ngOnInit();
      }
    });
  }
}
