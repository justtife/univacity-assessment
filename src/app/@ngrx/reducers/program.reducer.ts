import { createReducer, on } from '@ngrx/store';
import { ProgramActions } from '../actions/program.action';
import { ProgramState } from '../states/program.state';


export const programReducer = createReducer(
    ProgramState.initialState,
    on(ProgramActions.getAllPrograms, state => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(ProgramActions.loadAllProgramsSuccess, (state, { programs, universities, countries, degrees, languages, views }) => ({
        ...state,
        programs,
        universities,
        countries,
        degrees,
        languages,
        views,
        loading: false,
        error: null,
    })),
    on(ProgramActions.loadAllProgramsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);
