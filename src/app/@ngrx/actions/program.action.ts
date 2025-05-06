import { createAction, props } from "@ngrx/store";
import { Program } from "../../models";

export namespace ProgramActions {
    export const getAllPrograms = createAction('[Program] Load all Programs');
    export const loadAllProgramsSuccess = createAction(
        '[Program] Load All Programs Success',
        props<{
            programs: Program[];
            universities: string[];
            countries: string[];
            degrees: string[];
            languages: string[];
            views: number;
        }>()
    );
    export const loadAllProgramsFailure = createAction(
        '[Program] Load All Programs Failed',
        props<{ error: string }>()
    );
}