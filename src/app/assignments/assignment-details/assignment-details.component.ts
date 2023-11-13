import { DatePipe, NgIf, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Assignment } from "@app/assignments/assignments.model";
import { AssignmentsService } from "@app/shared/services/assignments.service";
import { Destroyed } from "@app/shared/utils/destroyed.component";

@Component({
    selector: 'app-assignment-details',
    templateUrl: './assignment-details.component.html',
    styleUrls: ['./assignment-details.component.scss'],
    standalone: true,
    imports: [MatCardModule, NgIf, MatButtonModule, MatProgressSpinnerModule, TitleCasePipe, DatePipe]
})
export class AssignmentDetailsComponent extends Destroyed {

    private readonly assignmentsService = inject(AssignmentsService);
    private readonly dialogRef: MatDialogRef<AssignmentDetailsComponent, Assignment> = inject(MatDialogRef);

    assignment: Assignment = inject(MAT_DIALOG_DATA);

    @Output()
    readonly deleteAssignment = new EventEmitter<Assignment>();

    isSendLoading = false;
    isDeleteLoading = false;

    handleSend() {
        const updatedAssignment: Assignment = {
            ...this.assignment,
            sent: true
        };

        this.isSendLoading = true;
        this.assignmentsService
            .updateAssignment(updatedAssignment)
            .pipe(this.untilDestroyed())
            .subscribe({
                next: assignment => Object.assign(this.assignment, assignment),
                error: () => this.isSendLoading = false,
                complete: () => this.isSendLoading = false
            });
    }

    handleDelete() {
        this.isDeleteLoading = true;
        this.assignmentsService
            .deleteAssignment(this.assignment)
            .pipe(this.untilDestroyed())
            .subscribe({
                next: assignment => this.dialogRef.close(assignment),
                error: () => this.isDeleteLoading = false,
                complete: () => this.isDeleteLoading = false
            });
    }

}
