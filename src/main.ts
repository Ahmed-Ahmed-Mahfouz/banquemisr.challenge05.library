import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './app/core/core.module';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule, CoreModule),
    provideRouter(routes),
  ],
}).catch((err) => {
  if (environment.production) {
    console.error('An error occurred:', err);
  } else {
    console.error(err);
  }
});
