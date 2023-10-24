import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { Assignment } from "@app/assignments/assignments.model";

@Component({
    selector: 'app-assignment',
    templateUrl: './assignment.component.html',
    styleUrls: ['./assignment.component.scss'],
    standalone: true,
    imports: [MatListModule, DatePipe]
})
export class AssignmentComponent {

    @Input({ required: true })
    assignment!: Assignment;

}
