import { Component, OnInit } from '@angular/core';
import { IonicComponents } from '../ionic-components';
import SharedComponents from '../components';
import { ModalController } from "@ionic/angular/standalone"
@Component({
  selector: 'app-individual-filter',
  templateUrl: './individual-filter.component.html',
  styleUrls: ['./individual-filter.component.scss'],
  imports: [IonicComponents, SharedComponents]
})
export class IndividualFilterComponent implements OnInit {
  searchTerm = '';
  selectedInstitute = '';

  institutes = [
    {
      name: 'University of Graz',
      country: 'Canada',
      logo: 'assets/imgs/university-logo.png',
      count: 629,
    },
    {
      name: 'University of Liverpool',
      country: 'Canada',
      logo: 'assets/imgs/university-logo.png',
      count: 629,
    },
    // Add more entries as needed...
  ];
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }
  filteredInstitutes() {
    const term = this.searchTerm.toLowerCase();
    return this.institutes.filter(i => i.name.toLowerCase().includes(term));
  }
  closeFilter() {
    this.modalCtrl.dismiss()
  }
}
