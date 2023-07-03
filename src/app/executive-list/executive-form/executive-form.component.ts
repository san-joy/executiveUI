import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { executiveData } from "src/app/models/executive-data.model";
import { executiveGroupData } from "src/app/models/executive-group-data.model";
import { ExecutiveGroupService } from "src/app/services/executive-group.service";

@Component({
  selector: 'app-executive-form',
  templateUrl: './executive-form.component.html',
  styleUrls: ['./executive-form.component.scss']
})
export class ExecutiveFormComponent implements OnInit, OnDestroy {
  @Input() executive: executiveData = {} as executiveData;
  @Output() formSubmitted: EventEmitter<executiveData> = new EventEmitter<executiveData>();
  title: string = '';
  executiveForm: FormGroup = new FormGroup({});
  titles: string[] = ['Mr', 'Mrs', 'Ms', 'Miss', 'Dr', 'Prof'];
  executiveGroupData: executiveGroupData[] = [];
  private executiveGroupsSubscription: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ExecutiveFormComponent>,
    private formBuilder: FormBuilder,
    private executiveGroupService: ExecutiveGroupService) {
    // Initialize the executive form with form controls and validators
    this.executiveForm = this.formBuilder.group({
      title: [null],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      executiveGroup: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    // Subscribe to the executive group service to fetch the executive group data
    this.executiveGroupsSubscription = this.executiveGroupService.getExecutiveGroups().subscribe({
      next: data => {
        this.executiveGroupData = data;
      },
      error: error => {
        console.error('There was an error!', error);
      },
      complete: () => { }
    });

    if (Object.keys(this.executive).length !== 0) {
      // If executive data is provided, set the form title and set the form values
      this.title = 'Edit';
      this.title = 'Edit';
      this.executiveForm.patchValue({
        title: this.executive.title,
        firstName: this.executive.firstName,
        lastName: this.executive.lastName,
        executiveGroup: this.executive.executiveGroup
      });
    } else {
      this.title = 'Create';
    }
  }

  compareGroups(group1: executiveGroupData, group2: executiveGroupData): boolean {
    // Compare function to determine if two executive groups are equal
    return group1 && group2 ? group1.id === group2.id : group1 === group2;
  }

  onSubmit(): void {
    if (this.executiveForm.valid) {
      const firstName = this.executiveForm.value.firstName;
      const lastName = this.executiveForm.value.lastName;
      // Generate system initials
      const systemInitials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
      // Include the generated system initials in the form value
      this.executiveForm.value.systemInitials = systemInitials;
      if (this.title === 'Edit') {
        // If the form is in 'Edit' mode, emit the form value with additional properties
        this.executiveForm.value.version = this.executive.version;
        this.executiveForm.value.id = this.executive.id;
        this.formSubmitted.emit(this.executiveForm.value);
      }

      this.dialogRef.close(this.executiveForm.value);
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from the executive groups subscription to avoid memory leaks
    this.executiveGroupsSubscription.unsubscribe();
  }
}
