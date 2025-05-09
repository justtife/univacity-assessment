import { createReducer, on } from '@ngrx/store';
import { FilterActions } from '../actions/filter.action';
import { FilterState } from '../states/filter.state';
import { OutputFormat } from 'src/app/models';
export const filterReducer = createReducer(
    FilterState.initialState,
    on(FilterActions.setFilter, (state, { filterType, ids }) => ({
        ...state,
        [filterType]: ids,
    })),
    on(FilterActions.removeFilterById, (state, { id }) => {
        const newState = { ...state };
        console.log(newState)
        Object.keys(newState).forEach(filterType => {
            if (filterType === 'tuitionRange') {
                return;
            }
            console.log(newState)
            if (Array.isArray(newState[filterType])) {
                newState[filterType] = newState[filterType].filter(
                    (item: OutputFormat) => item.id !== id
                );
                if (newState[filterType].length === 0) {
                    delete newState[filterType];
                }
            }
        });
        console.log(newState)
        return newState;
    }),
    on(FilterActions.setTuitionRangeActive, (state, { active }) => ({
        ...state,
        isTuitionRangeActive: active,
        ...(active ? {} : { tuitionPrograms: [] })
    })),

    on(FilterActions.clearFilter, (state, { filterType }) => {
        const newState = { ...state };
        delete newState[filterType];
        return newState;
    }),

    on(FilterActions.setTuitionRange, (state, { lower, upper, matchedPrograms }) => {
        const tuitionPrograms = matchedPrograms?.map(program => ({
            id: program.id,
        })) || [];

        return {
            ...state,
            tuitionRange: { lower, upper },
            tuitionPrograms,
            isTuitionRangeActive: true
        };
    }),
    on(FilterActions.enableFilter, (state, { enable }) => ({
        ...state,
        enable
    })),
    on(FilterActions.clearAllFilters, () => ({}))
);
