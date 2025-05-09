import { FilterModel, OutputFormat } from '../../models';

export namespace FilterState {
    export interface FState {
        Country: OutputFormat[],
        Discipline: OutputFormat[],
        "Education Level": OutputFormat[],
        Category: OutputFormat[],
        Institutes: OutputFormat[],
        "Study Language": OutputFormat[],
        Attendance: OutputFormat[],
        tuitionRange: { lower: number, upper: number },
        isTuitionRangeActive: boolean;
        enable: boolean
    }
    export const initialState: FilterModel = {
        Country: [],
        Discipline: [],
        Category: [],
        "Education Level": [],
        Institutes: [],
        "Study Language": [],
        Attendance: [],
        tuitionRange: { lower: 50000, upper: 120000 },
        isTuitionRangeActive: false,
        enable: false
    };
}
