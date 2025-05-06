import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from "@ngrx/store"
import { provideEffects } from "@ngrx/effects"
import { ProgramEffects } from './app/@ngrx/effects/program.effect';
import { programReducer } from './app/@ngrx/reducers/program.reducer';
import { addIcons } from 'ionicons';
import { calendar, book, globe, time, shareOutline, heartOutline, ribbon, language, chevronUpOutline, chevronDownOutline, eyeOutline, trendingUpOutline, sparkles, informationCircleOutline, checkmarkCircleOutline, checkmarkDone, closeOutline, filterOutline, funnelOutline, chevronBack, chevronForward, schoolOutline,timeOutline } from "ionicons/icons"
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
addIcons({ calendar, time, book, globe, shareOutline, heartOutline, ribbon, language, chevronUpOutline, chevronDownOutline, eyeOutline, trendingUpOutline, sparkles, informationCircleOutline, checkmarkCircleOutline, checkmarkDone, closeOutline, filterOutline, funnelOutline, chevronBack, chevronForward, schoolOutline,timeOutline });
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideHttpClient(),
    provideStore({ program: programReducer }),
    provideEffects([ProgramEffects]),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
