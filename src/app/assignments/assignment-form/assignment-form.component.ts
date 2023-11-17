import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Router, RouterLink } from "@angular/router";
import { Assignment } from "@app/assignments/assignments.model";
import { AssignmentsService } from "@app/shared/services/assignments.service";
import { Destroyed } from "@app/shared/utils/destroyed.component";

@Component({
    selector: 'app-assignment-form',
    templateUrl: './assignment-form.component.html',
    styleUrl: './assignment-form.component.scss',
    standalone: true,
    imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, ReactiveFormsModule, MatInputModule, RouterLink]
})
export class AssignmentFormComponent extends Destroyed implements OnInit {

    private readonly formBuilder = inject(FormBuilder);
    private readonly assignmentsService = inject(AssignmentsService);
    private readonly router = inject(Router);

    @Input()
    assignment?: Assignment | null;

    assignmentForm: FormGroup<{ [key in keyof Assignment]: FormControl<Assignment[key] | null> }> | null = null;

    isLoading = false;

    async ngOnInit(): Promise<void> {
        if (this.assignment === null) {
            await this.router.navigate([ "/" ]).catch(console.error);
            return;
        }

        this.assignmentForm = this.formBuilder.group({
            id: this.assignment?.id ?? null,
            title: [this.assignment?.title ?? "", Validators.required],
            description: [this.assignment?.description ?? "", Validators.required],
            deadline: [this.assignment?.deadline ?? new Date(), Validators.required],
            sent: [this.assignment?.sent ?? false, Validators.required]
        });
    }

    handleSubmit(): void {
        if (!this.assignmentForm || !this.assignmentForm.dirty || this.assignmentForm.invalid) return;

        this.isLoading = true;

        const submission = this.assignment
            ? this.assignmentsService.updateAssignment(this.assignmentForm.value as Assignment)
            : this.assignmentsService.addAssignment(this.assignmentForm.value as Assignment);

        submission
            .pipe(this.untilDestroyed())
            .subscribe({
                next: assignment => {
                    if (this.assignment) {
                        Object.assign(this.assignment, assignment);
                    }
                    this.router
                        .navigate([assignment.id])
                        .catch(console.error);
                },
                error: () => this.isLoading = false,
                complete: () => this.isLoading = false
            });
    }

}
