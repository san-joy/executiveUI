import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { executiveData } from 'src/app/models/executive-data.model';
import { ExecutiveService } from 'src/app/services/executive.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-view-executive',
  templateUrl: './view-executive.component.html',
  styleUrls: ['./view-executive.component.scss']
})
export class ViewExecutiveComponent implements OnInit {
  executive: executiveData = {} as executiveData;
  showForm: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private executiveService: ExecutiveService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    // Initialize executive data from the input data
    this.executive = this.data.executive;
  }

  // Function to enable editing the executive
  editExecutive(): void {
    this.showForm = true;
  }

  // Function to handle form submission
  handleFormSubmission(executive: executiveData): void {
    // Update the executive data with the submitted values
    this.executive = executive;

    // Create an updated executive data object using object destructuring
    const { title, firstName, lastName, systemInitials, version, executiveGroup } = this.executive;
    const updatedExecutiveData = { title, firstName, lastName, systemInitials, version, executiveGroup };

    // Call the executive service to update the executive data
    this.executiveService.updateExecutive(this.executive.id, updatedExecutiveData).subscribe({
      next: data => this.notificationService.openSnackBar('Executive updated successfully', 'Close'),
      error: error => console.error('There was an error!', error),
      complete: () => {
        // Reset the form state after completing the update
        this.showForm = false;
      }
    });
  }
}
