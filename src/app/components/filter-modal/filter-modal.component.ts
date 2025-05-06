import { Component, OnInit } from '@angular/core';
import { IonicComponents } from '../ionic-components';
import { ModalController } from "@ionic/angular/standalone"
import SharedComponents from '../components';
import { UtilityService } from 'src/app/services/utility.service';
import { IndividualFilterComponent } from '../individual-filter/individual-filter.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProgramSelector } from 'src/app/@ngrx/selectors/program.selector';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
  imports: [IonicComponents, SharedComponents]
})
export class FilterModalComponent implements OnInit {
  tuitionRange = {
    lower: 50000,
    upper: 120000,
  };
  data = 1024;
  selectedCountries = ['United States', 'United Kingdom'];
  selectedDisciplines = ['Law', 'Mathematics'];
  programs: Observable<any[]> = this.store.select(ProgramSelector.selectAllPrograms);
  institutes: Observable<any[]> = this.store.select(ProgramSelector.selectAllUniversities)
  education_levels: Observable<any[]> = this.store.select(ProgramSelector.selectAllDegrees)
  country: Observable<any[]> = this.store.select(ProgramSelector.selectAllCountries)
  // discipline: Observable<any[]> = this.store.select(ProgramSelector.selectAllUniversities)
  language: Observable<any[]> = this.store.select(ProgramSelector.selectAllLanguages)
  // attendance: Observable<any[]> = this.store.select(ProgramSelector.selectTotalViews)
  constructor(private store: Store, private modalCtrl: ModalController, private uS: UtilityService) { }
  ngOnInit() { }
  closeFilter() {
    this.modalCtrl.dismiss();
  };
  formatPinValue(value: number): string {
    return `${value / 1000}k`
  }
  openIndividualFilter(type: 'Country' | 'Discipline' | 'Education Level' | 'Institutes' | 'Study Language' | 'Attendance') {
    const dataMap: Record<typeof type, Observable<any[]>> = {
      Country: this.country,
      Discipline: this.programs, // Assuming disciplines come from programs
      'Education Level': this.education_levels,
      Institutes: this.institutes,
      'Study Language': this.language,
      Attendance: this.programs, // Replace with appropriate observable
    };

    const dataToPass = dataMap[type];
    this.uS.dialogOpener(
      IndividualFilterComponent,
      () => { },
      null,
      { type, data: dataToPass }
    );
  }
}
