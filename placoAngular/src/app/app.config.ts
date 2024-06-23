import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({
      "projectId":"adopcionesbd",
      "appId":"1:161716177944:web:aeab92b8c9b7bbb01b476d",
      "storageBucket":"adopcionesbd.appspot.com",
      "apiKey":"AIzaSyCerGpsCZh9AvFUcDhmyadsZ7cNfT1_fuM",
      "authDomain":"adopcionesbd.firebaseapp.com",
      "messagingSenderId":"161716177944",
      "measurementId":"G-BKK5W60ZT0"
    })),
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore())
  ]
};
