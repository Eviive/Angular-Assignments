import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from '@angular/material/list';
import { RouterLink } from "@angular/router";

import { Assignment } from "@app/assignments/assignments.model";

@Component({
    selector: 'app-assignment-item',
    templateUrl: './assignment-item.component.html',
    styleUrls: ['./assignment-item.component.scss'],
    standalone: true,
    imports: [MatListModule, DatePipe, RouterLink, MatButtonModule]
})
export class AssignmentItemComponent {

    @Input({ required: true })
    assignment!: Assignment;

}
