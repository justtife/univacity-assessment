import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProgramState } from '../states/program.state';
import { FilterSelector } from './filter.selector';

export namespace ProgramSelector {
    const select = createFeatureSelector<ProgramState.PState>('programs');
    export const selectAllPrograms = createSelector(
        select,
        (state) => state.programs
    );

    export const selectAllUniversities = createSelector(
        select,
        (state) => state.universities
    );

    export const selectAllCountries = createSelector(
        select,
        (state) => state.countries
    );

    export const selectAllDegrees = createSelector(
        select,
        (state) => state.degrees
    );

    export const selectAllLanguages = createSelector(
        select,
        (state) => state.languages
    );

    export const selectAllViews = createSelector(
        select,
        (state) => state.views
    );
    export const selectAllCategories = createSelector(
        select,
        (state) => state.categories
    );

    export const selectProgramsLoading = createSelector(
        select,
        (state) => state.loading
    );

    export const selectProgramsError = createSelector(
        select,
        (state) => state.error
    );

    export const selectFilteredProgramIds = createSelector(
        selectAllPrograms,
        FilterSelector.selectCountryFilter,
        FilterSelector.selectEducationFilter,
        FilterSelector.selectInstituteFilter,
        FilterSelector.selectLanguageFilter,
        FilterSelector.selectAttendanceFilter,
        FilterSelector.selectTuitionRange,
        FilterSelector.selectIsTuitionRangeActive,
        (programs, countries, educationLevels, institutes, languages, attendance, tuitionRange, isTuitionRangeActive) => {
            if (!programs || !programs.length) return [];

            // Check if any filter is truly active
            const filtersExist =
                (countries?.length || 0) > 0 ||
                (educationLevels?.length || 0) > 0 ||
                (institutes?.length || 0) > 0 ||
                (languages?.length || 0) > 0 ||
                (attendance?.length || 0) > 0 ||
                (isTuitionRangeActive && tuitionRange);

            if (!filtersExist) {
                return [];
            }

            const matchedPrograms: { id: string, category: string, main: string }[] = [];

            programs.forEach(program => {
                // Only apply tuition filter if user actively set it
                const tuitionInRange = !isTuitionRangeActive || (
                    program.programDetails?.tuition !== undefined &&
                    program.programDetails.tuition >= tuitionRange.lower &&
                    program.programDetails.tuition <= tuitionRange.upper
                );

                if (!tuitionInRange) return;

                const matchingInstituteIds = institutes?.filter(i => i.main === program.university).map(i => i.id ?? '') || [];
                const matchingEducationIds = educationLevels?.filter(e => e.main === program.programDetails?.degree_level).map(e => e.id ?? '') || [];
                const matchingCountryIds = countries?.filter(c => c.main === program.country).map(c => c.id ?? '') || [];
                const matchingLanguageIds = languages?.filter(l => program.programDetails?.language?.includes(l.additional ?? '')).map(l => l.id ?? '') || [];
                console.log(program)
                const matchingAttendanceIds = attendance?.filter(a => a.main === program.views).map(a => a.id ?? '') || [];

                const allMatchingFilterIds = [
                    ...matchingInstituteIds,
                    ...matchingEducationIds,
                    ...matchingCountryIds,
                    ...matchingLanguageIds,
                    ...matchingAttendanceIds
                ].filter(id => id !== '');

                const matchesCountry = !countries?.length || matchingCountryIds.length > 0;
                const matchesEducation = !educationLevels?.length || matchingEducationIds.length > 0;
                const matchesInstitute = !institutes?.length || matchingInstituteIds.length > 0;
                const matchesLanguage = !languages?.length || matchingLanguageIds.length > 0;
                const matchesAttendance = !attendance?.length || matchingAttendanceIds.length > 0;

                if (
                    (countries?.length && matchesCountry) ||
                    (educationLevels?.length && matchesEducation) ||
                    (institutes?.length && matchesInstitute) ||
                    (languages?.length && matchesLanguage) ||
                    (attendance?.length && matchesAttendance) ||
                    (!countries?.length && !educationLevels?.length && !institutes?.length && !languages?.length && !attendance?.length && tuitionInRange)
                ) {
                    matchedPrograms.push({
                        id: program.id,
                        category: program.category || '',
                        main: allMatchingFilterIds[0] || ''
                    });
                }
            });

            return matchedPrograms;
        }
    );

    export const selectFilteredProgramsCount = createSelector(
        selectFilteredProgramIds,
        ids => ids.length
    );
}
