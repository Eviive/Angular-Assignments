import { DatePipe, NgIf, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Assignment } from "@app/assignments/assignments.model";
import { AssignmentsService } from "@app/assignments/assignments.service";
import { Destroyed } from "@app/shared/utils/destroyed.component";

@Component({
    selector: 'app-assignment-details',
    templateUrl: './assignment-details.component.html',
    styleUrls: ['./assignment-details.component.scss'],
    standalone: true,
    imports: [MatCardModule, NgIf, MatButtonModule, MatProgressSpinnerModule, TitleCasePipe, DatePipe]
})
export class AssignmentDetailsComponent extends Destroyed {

    @Input({ required: true })
    assignment!: Assignment;

    @Output()
    readonly deleteAssignment = new EventEmitter<Assignment>();

    isSendLoading = false;
    isDeleteLoading = false;

    constructor(
        private readonly assignmentsService: AssignmentsService
    ) {
        super();
    }

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
                next: () => this.deleteAssignment.emit(this.assignment),
                error: () => this.isDeleteLoading = false,
                complete: () => this.isDeleteLoading = false
            });
    }

}
