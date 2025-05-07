import { createReducer, on } from '@ngrx/store';
import { FilterActions } from '../actions/filter.action';
import { FilterState } from '../states/filter.state';

export const filterReducer = createReducer(
    FilterState.initialState,
    on(FilterActions.setFilter, (state, { filterType, ids }) => ({
        ...state,
        [filterType]: ids,
    })),
    on(FilterActions.clearFilter, (state, { filterType }) => {
        const newState = { ...state };
        delete newState[filterType];
        return newState;
    }),
    on(FilterActions.clearAllFilters, () => ({}))
);
