import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { Assignment } from "@app/assignments/assignments.model";
import { AssignmentsService } from "@app/shared/services/assignments.service";

export const assignmentListResolver: ResolveFn<Assignment[]> = () => inject(AssignmentsService).getAssignments();
