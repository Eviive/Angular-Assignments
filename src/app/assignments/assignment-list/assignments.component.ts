import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from "@angular/material/dialog";
import { MatListModule } from '@angular/material/list';
import { RouterLink } from "@angular/router";
import { AssignmentItemComponent } from '@app/assignments/assignment-item/assignment-item.component';
import { Assignment } from "@app/assignments/assignments.model";

@Component({
    selector: 'app-assignments',
    templateUrl: './assignments.component.html',
    styleUrls: ['./assignments.component.scss'],
    standalone: true,
    imports: [NgIf, MatButtonModule, MatCardModule, MatListModule, FormsModule, NgFor, AssignmentItemComponent, MatDialogModule, RouterLink]
})
export class AssignmentsComponent {

    @Input({ required: true })
    assignments!: Assignment[];

}
