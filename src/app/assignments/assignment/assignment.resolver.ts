import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { Assignment } from "@app/assignments/assignments.model";
import { AssignmentsService } from "@app/shared/services/assignments.service";
import { catchError, of } from "rxjs";

export const assignmentResolver: ResolveFn<Assignment | null> = route =>
    inject(AssignmentsService)
        .getAssignment(route.params["id"])
        .pipe(
            catchError(() => of(null))
        );
