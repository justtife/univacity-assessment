import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, of, tap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { ProgramActions } from '../actions/program.action';
import { UtilityService } from 'src/app/services/utility.service';

@Injectable()
export class ProgramEffects {

    constructor(private actions$: Actions, private apiS: ApiService, private uS: UtilityService) { }

    allPrograms = createEffect(() =>
        this.actions$.pipe(
            ofType(ProgramActions.getAllPrograms),
            switchMap(() =>
                this.apiS.getAllPrograms().pipe(
                    mergeMap(programs =>
                        this.apiS.getAllUniversities().pipe(
                            map(universities => ({ programs, universities }))
                        )
                    ),
                    mergeMap(({ programs, universities }) =>
                        this.apiS.getAllCountries().pipe(
                            map(countries => ({ programs, universities, countries }))
                        )
                    ),
                    mergeMap(({ programs, universities, countries }) =>
                        this.apiS.getAllDegreeLevels().pipe(
                            map(degrees => ({ programs, universities, countries, degrees }))
                        )
                    ),
                    mergeMap(({ programs, universities, countries, degrees }) =>
                        this.apiS.getAllLanguages().pipe(
                            map(languages => ({
                                programs,
                                universities,
                                countries,
                                degrees,
                                languages,
                            }))
                        )
                    ),
                    mergeMap(({ programs, universities, countries, degrees, languages }) =>
                        this.apiS.getAllViews().pipe(
                            map(views =>
                                ProgramActions.loadAllProgramsSuccess({
                                    programs,
                                    universities,
                                    countries,
                                    degrees,
                                    languages,
                                    views,
                                })
                            )
                        )
                    ),
                    catchError(error =>
                        of(ProgramActions.loadAllProgramsFailure({ error }))
                    )
                )
            )
        )
    );

    allProgramsSuccess = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ProgramActions.loadAllProgramsSuccess),
                tap(({ programs, universities, countries, degrees, languages, views }) => {
                    console.log('Successfully loaded programs data.');
                })
            ),
        { dispatch: false }
    );

    allProgramFailure = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ProgramActions.loadAllProgramsFailure),
                tap(({ error }) => {
                    console.error('Failed to load programs data:', error);
                    this.uS.info('An error occured, unable to retrieve information. Please try again later.', "Error")
                })
            ),
        { dispatch: false }
    );
}
