import { OutputFormat, Program } from "../../models";
export namespace ProgramState {
    export interface PState {
        programs: Program[];
        universities: OutputFormat[];
        categories: OutputFormat[];
        countries: OutputFormat[];
        degrees: OutputFormat[];
        languages: OutputFormat[];
        views: OutputFormat[];
        loading: boolean;
        error: string | null;
        filtersApplied?: boolean
    }
    export const initialState: PState = {
        programs: [],
        universities: [],
        categories: [],
        countries: [],
        degrees: [],
        languages: [],
        views: [],
        loading: false,
        error: null,
    }
}