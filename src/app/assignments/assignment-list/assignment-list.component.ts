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
    selector: 'app-assignment-list',
    templateUrl: './assignment-list.component.html',
    styleUrls: ['./assignment-list.component.scss'],
    standalone: true,
    imports: [MatButtonModule, MatCardModule, MatListModule, FormsModule, AssignmentItemComponent, MatDialogModule, RouterLink]
})
export class AssignmentListComponent {

    @Input({ required: true })
    assignments!: Assignment[];

}
