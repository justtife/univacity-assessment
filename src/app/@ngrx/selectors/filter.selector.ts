import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilterState } from '../states/filter.state';

export namespace FilterSelector {
    const select = createFeatureSelector<FilterState.FState>('filters');
    export const selectCountryFilter = createSelector(
        select,
        (state) => state.Country
    );
    export const selectDisciplineFilter = createSelector(
        select,
        (state) => state.Discipline
    );
    export const selectEducationFilter = createSelector(
        select,
        (state) => state['Education Level']
    );
    export const selectInstituteFilter = createSelector(
        select,
        (state) => state.Institutes
    );
    export const selectLanguageFilter = createSelector(
        select,
        (state) => state['Study Language']
    );
    export const selectAttendanceFilter = createSelector(
        select,
        (state) => state.Attendance
    );
}