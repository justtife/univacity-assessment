import { NgModule } from '@angular/core';
import { IonicComponents } from './ionic-components';
import { ProgramCardComponent } from './program-card/program-card.component';
import { CustomButtonComponent } from './custom-button/custom-button.component';

const _SharedComponents = [
    ProgramCardComponent,
    CustomButtonComponent
] as const;


@NgModule({
    declarations: [],
    imports: [IonicComponents, ..._SharedComponents],
    exports: [IonicComponents, ..._SharedComponents],
    providers: [],
})
export default class SharedComponents { }
