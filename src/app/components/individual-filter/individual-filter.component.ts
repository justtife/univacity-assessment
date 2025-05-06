import { Component, Input } from '@angular/core';
import { ModalController } from "@ionic/angular/standalone";
import { IonicComponents } from '../ionic-components';
import SharedComponents from '../components';

@Component({
  selector: 'app-individual-filter',
  templateUrl: './individual-filter.component.html',
  styleUrls: ['./individual-filter.component.scss'],
  imports: [IonicComponents, SharedComponents]
})
export class IndividualFilterComponent {
  @Input() type!: string;
  @Input() data!: any; // Assume it's an Observable<any[]>

  searchTerm = '';
  selectedInstitute = '';
  items: any[] = []; // To store resolved data

  constructor(private modalCtrl: ModalController) { }

  ionViewWillEnter() {
    if (this.data?.subscribe) {
      this.data.subscribe((res: any[]) => {
        this.items = res;
        console.log('Loaded data:', res);
      });
    }
  }

  get filteredItems() {
    const term = this.searchTerm.toLowerCase();
    return this.items.filter(item =>
      item.main.toLowerCase().includes(term)
    );
  }

  closeFilter() {
    this.modalCtrl.dismiss();
  }
}
