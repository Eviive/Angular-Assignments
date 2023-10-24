import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

type User = {
    id: number;
    name: string;
};

const users: User[] = [
    {
        id: 1,
        name: "John Doe",
    },
    {
        id: 2,
        name: "Jane Doe",
    }
];

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly usersSubject = new BehaviorSubject<User[]>(users);

    readonly users$ = this.usersSubject.asObservable();

}
