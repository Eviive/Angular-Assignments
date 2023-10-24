import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatListModule } from '@angular/material/list';
import { Assignment } from "@app/assignments/assignments.model";
import { AssignmentDetailsComponent } from './assignment-details/assignment-details.component';
import { AssignmentFormComponent } from './assignment-form/assignment-form.component';
import { AssignmentComponent } from './assignment/assignment.component';

@Component({
    selector: 'app-assignments',
    templateUrl: './assignments.component.html',
    styleUrls: ['./assignments.component.scss'],
    standalone: true,
    imports: [NgIf, MatButtonModule, MatCardModule, MatListModule, FormsModule, NgFor, AssignmentComponent, MatDialogModule]
})
export class AssignmentsComponent {

    @Input({ required: true })
    assignments!: Assignment[];

    selectedAssignments?: Assignment[];

    constructor(
        private readonly dialog: MatDialog
    ) {}

    openForm(): void {
        this.dialog
            .open<AssignmentFormComponent, never, Assignment>(AssignmentFormComponent)
            .afterClosed()
            .subscribe(result => {
                if (!result) return;
                this.assignments.push(result);
            });
    }

    handleSelect(): void {
        if (this.selectedAssignments?.length) {
            this.openDetails(this.selectedAssignments[0]);
        }
    }

    openDetails(assignment: Assignment): void {
        this.dialog
            .open<AssignmentDetailsComponent, Assignment, Assignment>(AssignmentDetailsComponent, {
                data: assignment
            })
            .afterClosed()
            .subscribe(deletedAssignment => {
                if (deletedAssignment) {
                    this.assignments = this.assignments.filter(a => a !== deletedAssignment)
                }
                this.selectedAssignments = this.selectedAssignments?.filter(a => a !== assignment);
            });
    }

}
