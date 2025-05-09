import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicComponents } from '../ionic-components';
import { ModalController } from "@ionic/angular/standalone";
import SharedComponents from '../components';
import { UtilityService } from 'src/app/services/utility.service';
import { IndividualFilterComponent } from '../individual-filter/individual-filter.component';
import { Observable, combineLatest, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProgramSelector } from 'src/app/@ngrx/selectors/program.selector';
import { FilterSelector } from 'src/app/@ngrx/selectors/filter.selector';
import { FilterActions } from 'src/app/@ngrx/actions/filter.action';
import { OutputFormat } from 'src/app/models';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
  imports: [IonicComponents, SharedComponents],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FilterModalComponent implements OnInit {
  tuitionRange$ = this.store.select(FilterSelector.selectTuitionRange)
  // Get just the count
  filteredProgramCount$ = this.store.select(ProgramSelector.selectFilteredProgramsCount);

  views$ = this.store.select(ProgramSelector.selectAllViews);
  institutes$ = this.store.select(ProgramSelector.selectAllUniversities);
  education_levels$ = this.store.select(ProgramSelector.selectAllDegrees);
  countries$ = this.store.select(ProgramSelector.selectAllCountries);
  languages$ = this.store.select(ProgramSelector.selectAllLanguages);

  // Observables for selected filters
  selectedCountries$ = this.store.select(FilterSelector.selectCountryFilter);
  selectedEducationLevels$ = this.store.select(FilterSelector.selectEducationFilter);
  selectedInstitutes$ = this.store.select(FilterSelector.selectInstituteFilter);
  selectedLanguages$ = this.store.select(FilterSelector.selectLanguageFilter);
  selectedAttendance$ = this.store.select(FilterSelector.selectAttendanceFilter);

  // Combined data for template
  filterStatus$ = combineLatest([
    this.selectedCountries$,
    this.selectedEducationLevels$,
    this.selectedInstitutes$,
    this.selectedLanguages$,
    this.selectedAttendance$
  ]).pipe(
    map(([countries, educationLevels, institutes, languages, attendance]) => ({
      countries: countries || [],
      educationLevels: educationLevels || [],
      institutes: institutes || [],
      languages: languages || [],
      attendance: attendance || []
    }))
  );
  constructor(
    private store: Store,
    private modalCtrl: ModalController,
    private uS: UtilityService
  ) { }

  ngOnInit() {
    this.filteredProgramCount$.subscribe((res) => {
      console.log(res)
    })
  }

  closeFilter(data?: any) {
    this.modalCtrl.dismiss({ ...data });
  }

  formatPinValue(value: number): string {
    return `${value / 1000}k`;
  }
  onRangeChange(rangeValues: any) {
    this.store.select(ProgramSelector.selectAllPrograms).subscribe(programs => {
      const matchedPrograms = programs
        .filter(program =>
          program.programDetails?.tuition >= rangeValues.lower &&
          program.programDetails?.tuition <= rangeValues.upper
        )
        .map(program => ({
          main: program.programDetails?.tuition || 0,
          id: program.id,
        }));

      this.store.dispatch(FilterActions.setTuitionRange({
        lower: rangeValues.lower,
        upper: rangeValues.upper,
        matchedPrograms
      }));
    });
  }
  openIndividualFilter(type: 'Country' | 'Education Level' | 'Institutes' | 'Study Language' | 'Attendance') {
    const dataMap: Record<typeof type, Observable<OutputFormat[] | any[]>> = {
      'Country': this.countries$,
      'Education Level': this.education_levels$,
      'Institutes': this.institutes$,
      'Study Language': this.languages$,
      'Attendance': this.views$,
    };
    this.uS.dialogOpener(
      IndividualFilterComponent,
      (data) => {
        this.store.dispatch(FilterActions.setFilter({
          filterType: data.type,
          ids: data.selectedItems
        }));
      },
      null,
      { type, data: dataMap[type] }
    );
  }
  applyFilter() {
    this.closeFilter({ enableFilter: true })
  }
  clearAllFilters() {

    this.store.dispatch(FilterActions.clearAllFilters());
    this.store.dispatch(FilterActions.setTuitionRange({
      lower: 50000,
      upper: 120000,
      matchedPrograms: []
    }));
    this.store.dispatch(FilterActions.setTuitionRangeActive({ active: false }));
  }
}
