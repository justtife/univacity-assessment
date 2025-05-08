import { createAction, props } from "@ngrx/store";
import { Program, OutputFormat } from "../../models";

export namespace ProgramActions {
    export const getAllPrograms = createAction('[Program] Load all Programs');
    export const loadAllProgramsSuccess = createAction(
        '[Program] Load All Programs Success',
        props<{
            programs: Program[];
            universities: OutputFormat[];
            categories: OutputFormat[];
            countries: OutputFormat[];
            degrees: OutputFormat[];
            languages: OutputFormat[];
            views: OutputFormat[];
        }>()
    );
    export const loadAllProgramsFailure = createAction(
        '[Program] Load All Programs Failed',
        props<{ error: string }>()
    );
}