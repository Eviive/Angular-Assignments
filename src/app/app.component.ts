import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from "@app/shared/services/user.service";
import { Destroyed } from "@app/shared/utils/destroyed.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [MatToolbarModule, RouterOutlet, MatButtonModule, RouterLink]
})
export class AppComponent extends Destroyed implements OnInit {

    private readonly userService = inject(UserService);

    ngOnInit(): void {
        this.userService.users$
            .pipe(this.untilDestroyed())
            .subscribe(console.log);
    }

}
