import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';
import { TodoService } from '@quantalys-todo/client/data-access';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    TodoService
  ],
};
