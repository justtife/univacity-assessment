import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProgramState } from '../states/program.state';

export namespace ProgramSelector {
    const select = createFeatureSelector<ProgramState.PState>('program');
    export const selectAllPrograms = createSelector(
        select,
        (state) => state.programs
    );
    export const selectAllUniversities = createSelector(
        select,
        (state) => state.universities
    );

    export const selectAllCountries = createSelector(
        select,
        (state) => state.countries
    );

    export const selectAllDegrees = createSelector(
        select,
        (state) => state.degrees
    );

    export const selectAllLanguages = createSelector(
        select,
        (state) => state.languages
    );

    export const selectTotalViews = createSelector(
        select,
        (state) => state.views
    );

    export const selectProgramsLoading = createSelector(
        select,
        (state) => state.loading
    );

    export const selectProgramsError = createSelector(
        select,
        (state) => state.error
    );

}