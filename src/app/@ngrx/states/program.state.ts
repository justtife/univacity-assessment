import { Program } from "../../models";

export namespace ProgramState {
    export interface PState {
        programs: Program[];
        universities: string[];
        countries: string[];
        degrees: string[];
        languages: string[];
        views: number;
        loading: boolean;
        error: string | null;
    }
    export const initialState: PState = {
        programs: [],
        universities: [],
        countries: [],
        degrees: [],
        languages: [],
        views: 0,
        loading: false,
        error: null,
    }
}