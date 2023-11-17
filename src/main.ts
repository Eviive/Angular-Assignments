import { registerLocaleData } from "@angular/common";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import frenchLocale from '@angular/common/locales/fr';
import { importProvidersFrom, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, RouterOutlet, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { ROUTES } from "src/routing";

registerLocaleData(frenchLocale);

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, MatButtonModule, MatIconModule, MatDividerModule, MatInputModule, MatFormFieldModule, FormsModule, MatCheckboxModule, MatCardModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, MatListModule, RouterOutlet, MatToolbarModule, MatProgressSpinnerModule),
        provideRouter(
            ROUTES,
            withRouterConfig({
                paramsInheritanceStrategy: 'always'
            }),
            withComponentInputBinding(),
            // withDebugTracing()
        ),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        {
            provide: LOCALE_ID,
            useValue: 'fr-FR'
        }
    ]
})
    .catch(console.error);
