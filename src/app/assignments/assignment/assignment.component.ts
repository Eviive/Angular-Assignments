import { DatePipe } from "@angular/common";
import { Component, inject, Input } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Router, RouterLink } from "@angular/router";
import { Assignment } from "@app/assignments/assignments.model";
import { AssignmentsService } from "@app/shared/services/assignments.service";

@Component({
    selector: 'app-assignment',
    templateUrl: './assignment.component.html',
    styleUrl: './assignment.component.scss',
    standalone: true,
    imports: [MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, ReactiveFormsModule, DatePipe, RouterLink]
})
export class AssignmentComponent {

    private readonly assignmentsService = inject(AssignmentsService);
    private readonly router = inject(Router);

    @Input({ required: true })
    assignment!: Assignment | null;

    isLoading = false;

    handleDelete(assignment: Assignment): void {
        this.isLoading = true;

        this.assignmentsService
            .deleteAssignment(assignment)
            .subscribe({
                next: () => {
                    this.router
                        .navigate([ "/" ])
                        .catch(console.error);
                },
                error: () => this.isLoading = false,
                complete: () => this.isLoading = false
            });
    }

}
