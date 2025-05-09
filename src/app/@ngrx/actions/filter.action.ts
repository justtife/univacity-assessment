import { createAction, props } from '@ngrx/store';
import { OutputFormat } from 'src/app/models';
export namespace FilterActions {
    export const setFilter = createAction(
        '[Filter] Set Filter',
        props<{ filterType: string; ids: OutputFormat[] }>()
    );
    export const removeFilterById = createAction(
        '[Filter] Remove Filter By ID',
        props<{ id: string }>()
    );
    export const clearFilter = createAction(
        '[Filter] Clear Filter',
        props<{ filterType: string }>()
    );
    export const setTuitionRange = createAction(
        '[Filter] Set Tuition Range',
        props<{ lower: number; upper: number; matchedPrograms?: OutputFormat[] }>()
    );
    export const setTuitionRangeActive = createAction(
        '[Filter] Set Tuition Range Active',
        props<{ active: boolean }>()
    );
    export const enableFilter = createAction(
        '[Filter] Enable Filter',
        props<{ enable: boolean }>()
    );
    export const clearAllFilters = createAction('[Filter] Clear All Filters');
}