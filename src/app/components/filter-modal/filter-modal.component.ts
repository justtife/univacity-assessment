import { Component, OnInit } from '@angular/core';
import { IonicComponents } from '../ionic-components';
import { ModalController } from "@ionic/angular/standalone"
import SharedComponents from '../components';
import { UtilityService } from 'src/app/services/utility.service';
import { IndividualFilterComponent } from '../individual-filter/individual-filter.component';
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

  constructor(private modalCtrl: ModalController, private uS: UtilityService) { }
  ngOnInit() { }
  closeFilter() {
    this.modalCtrl.dismiss();
  };
  formatPinValue(value: number): string {
    return `${value / 1000}k`
  }
  openIndividualFilter() {
    this.uS.dialogOpener(IndividualFilterComponent, () => { }, null, null)
  }
}
