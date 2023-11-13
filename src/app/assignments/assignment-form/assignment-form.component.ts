import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Assignment } from "@app/assignments/assignments.model";
import { AssignmentsService } from "@app/shared/services/assignments.service";
import { Destroyed } from "@app/shared/utils/destroyed.component";

@Component({
    selector: 'app-assignment-form',
    templateUrl: './assignment-form.component.html',
    styleUrls: ['./assignment-form.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatCheckboxModule, MatButtonModule, NgIf, MatProgressSpinnerModule]
})
export class AssignmentFormComponent extends Destroyed {

    private readonly formBuilder = inject(FormBuilder);
    private readonly assignmentsService = inject(AssignmentsService);
    private readonly dialogRef = inject(MatDialogRef<AssignmentFormComponent>);

    readonly assignmentForm = this.formBuilder.group({
        title: ['', Validators.required],
        deadline: [new Date(), Validators.required],
        sent: [false, Validators.required]
    });

    isLoading = false;

    handleSubmit() {
        if (this.assignmentForm.invalid) {
            return;
        }

        this.isLoading = true;
        this.assignmentsService
            .addAssignment(this.assignmentForm.value as Assignment)
            .pipe(this.untilDestroyed())
            .subscribe({
                next: assignment => {
                    this.dialogRef.close(assignment);
                },
                error: () => this.isLoading = false,
                complete: () => this.isLoading = false
            });
    }

    handleCancel($event: MouseEvent) {
        $event.preventDefault();
        this.dialogRef.close();
    }

}
