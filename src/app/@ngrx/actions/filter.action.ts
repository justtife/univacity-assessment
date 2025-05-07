import { createAction, props } from '@ngrx/store';
export namespace FilterActions {
    export const setFilter = createAction(
        '[Filter] Set Filter',
        props<{ filterType: string; ids: string[] }>()
    );

    export const clearFilter = createAction(
        '[Filter] Clear Filter',
        props<{ filterType: string }>()
    );

    export const clearAllFilters = createAction('[Filter] Clear All Filters');
}