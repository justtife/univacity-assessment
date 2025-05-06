import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
    IonContent, IonApp, IonIcon,
    IonTabs, IonFab, IonFabButton,
    IonTabBar, IonTabButton,
    IonBadge,
    IonLabel, IonSelect, IonSelectOption,
    IonGrid, IonRow, IonCol,
    IonButton, IonHeader, IonToolbar,
    IonTitle, IonBackButton,
    IonRouterOutlet, IonTextarea, IonInfiniteScroll, IonInfiniteScrollContent,
    IonInput, IonItem, IonRadio, IonAccordion, IonList, IonAccordionGroup, IonButtons, IonChip, IonNote, IonFooter, IonListHeader, IonRange, IonAvatar
} from '@ionic/angular/standalone';

export const components = [
    CommonModule, IonApp,
    IonContent, IonIcon, IonTabs,
    IonFab, IonFabButton, IonTabBar,
    IonTabButton, IonBadge,
    IonLabel, IonGrid, IonRow,
    IonCol, IonButton, IonHeader,
    IonToolbar, IonTitle, IonBackButton,
    IonRouterOutlet, IonTextarea, IonInfiniteScroll, IonInfiniteScrollContent,
    IonInput, IonItem, ReactiveFormsModule,
    FormsModule, IonSelect, IonList, IonSelectOption,
    IonRadio, RouterModule, IonAccordion, IonAccordionGroup, IonButtons, IonChip, IonNote, IonFooter, IonListHeader, IonRange, IonAvatar
] as const;

@NgModule({
    declarations: [],
    imports: [...components],
    exports: [...components],
    providers: [],
})
export class IonicComponents { }