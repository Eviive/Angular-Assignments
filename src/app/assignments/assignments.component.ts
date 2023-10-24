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
    imports: [NgIf, MatButtonModule, AssignmentFormComponent, AssignmentDetailsComponent, MatCardModule, MatListModule, FormsModule, NgFor, AssignmentComponent, MatDialogModule]
})
export class AssignmentsComponent {

    @Input({ required: true })
    assignments!: Assignment[];

    selectedAssignments: Assignment[] | undefined;

    constructor(
        private readonly dialog: MatDialog
    ) {}

    openForm(): void {
        this.dialog
            .open(AssignmentFormComponent)
            .afterClosed()
            .subscribe((result?: Assignment) => {
                if (!result) return;
                this.assignments.push(result);
            });
    }

    handleDelete(assignment: Assignment): void {
        this.assignments = this.assignments.filter(a => a !== assignment)
        this.selectedAssignments = this.selectedAssignments?.filter(a => a !== assignment);
    }

}
