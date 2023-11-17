import { Routes } from "@angular/router";
import { assignmentListResolver } from "@app/assignments/assignment-list/assignment-list.resolver";
import { assignmentResolver } from "@app/assignments/assignment/assignment.resolver";

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('@app/assignments/assignment-list/assignment-list.component').then(m => m.AssignmentListComponent),
        resolve: {
            assignments: assignmentListResolver
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
