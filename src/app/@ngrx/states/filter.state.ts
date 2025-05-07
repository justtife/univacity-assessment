import { FilterModel } from '../../models';

export namespace FilterState {
    export interface FState {
        Country: string[],
        Discipline: string[],
        "Education Level": string[],
        Institutes: string[],
        "Study Language": string[],
        Attendance: string[]
    }
    export const initialState: FilterModel = {
        Country: [],
        Discipline: [],
        "Education Level": [],
        Institutes: [],
        "Study Language": [],
        Attendance: []
    };
}
