import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Assignment } from "@app/assignments/assignments.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

    private readonly baseUrl = 'https://6527b9e5931d71583df145c6.mockapi.io/assignments';

    constructor(
        private readonly http: HttpClient
    ) {}

    getAssignments(): Observable<Assignment[]> {
        return this.http.get<Assignment[]>(`${this.baseUrl}`);
    }

    getAssignment(id: number | string): Observable<Assignment> {
        return this.http.get<Assignment>(`${this.baseUrl}/${id}`);
    }

    addAssignment(assignment: Assignment): Observable<Assignment> {
        return this.http.post<Assignment>(`${this.baseUrl}`, assignment);
    }

    updateAssignment(assignment: Assignment): Observable<Assignment> {
        return this.http.put<Assignment>(`${this.baseUrl}/${assignment.id}`, assignment);
    }

    deleteAssignment(assignment: Assignment): Observable<Assignment> {
        return this.http.delete<Assignment>(`${this.baseUrl}/${assignment.id}`);
    }

}
