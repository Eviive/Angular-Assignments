import { Routes } from "@angular/router";
import { assignmentsResolver } from "@app/assignments/assignment-list/assignments.resolver";
import { assignmentResolver } from "@app/assignments/assignment/assignment.resolver";

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('@app/assignments/assignment-list/assignments.component').then(m => m.AssignmentsComponent),
        resolve: {
            assignments: assignmentsResolver
        }
    },
    {
        path: 'new',
        loadComponent: () => import('@app/assignments/assignment-form/assignment-form.component').then(m => m.AssignmentFormComponent)
    },
    {
        path: ':id',
        resolve: {
            assignment: assignmentResolver
        },
        children: [
            {
                path: '',
                loadComponent: () => import('@app/assignments/assignment/assignment.component').then(m => m.AssignmentComponent)
            },
            {
                path: 'edit',
                loadComponent: () => import('@app/assignments/assignment-form/assignment-form.component').then(m => m.AssignmentFormComponent)
            }
        ]
    }
];
