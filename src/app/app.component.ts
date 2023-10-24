import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from "@app/shared/services/user.service";
import { Destroyed } from "@app/shared/utils/destroyed.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [MatToolbarModule, RouterOutlet, RouterLink]
})
export class AppComponent extends Destroyed implements OnInit {

    constructor(
        private readonly userService: UserService
    ) {
        super();
    }

    ngOnInit(): void {
        this.userService.users$
            .pipe(this.untilDestroyed())
            .subscribe(console.log);
    }

}
