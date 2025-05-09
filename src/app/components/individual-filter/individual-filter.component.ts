import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { IonicComponents } from '../ionic-components';
import SharedComponents from '../components';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { MemoizedSelector } from '@ngrx/store';
import { FilterSelector } from 'src/app/@ngrx/selectors/filter.selector';
import { FilterActions } from 'src/app/@ngrx/actions/filter.action';
import { OutputFormat } from 'src/app/models';

@Component({
  selector: 'app-individual-filter',
  templateUrl: './individual-filter.component.html',
  styleUrls: ['./individual-filter.component.scss'],
  imports: [IonicComponents, SharedComponents],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IndividualFilterComponent {
  @Input() type!: string;
  @Input() data!: any;

  searchTerm = '';
  selectedIds: string[] = [];
  items: any[] = [];

  constructor(private modalCtrl: ModalController, private store: Store) { }

  ionViewWillEnter() {
    if (this.data?.subscribe) {
      this.data.subscribe((res: any[]) => {
        this.items = this.processItems(res);
        this.loadSelectedIds();
      });
    }
  }

  private processItems(items: any[]): any[] {
    const uniqueItems = new Map<string, any>();

    items.forEach(item => {
      const key = `${item.main}|${item.additional}`; // Create unique key
      if (!uniqueItems.has(key)) {
        const processed = { ...item };
        if (!processed.id) {
          processed.id = processed.main;
        }
        if (this.type === 'Education Level') {
          processed.main = this.getFullLanguageName(processed.main);
        } else if (this.type === 'Institutes') {
          processed.subImage = this.getFlagCode(processed.additional);
        }
        else if (this.type === 'Study Language') {
          processed.additional = processed.main;
          processed.main = this.getFullLanguageName(processed.main);
        }
        uniqueItems.set(key, processed);
      }
    });

    return Array.from(uniqueItems.values());
  }

  private loadSelectedIds() {
    let selector: MemoizedSelector<object, OutputFormat[]> | null = null;

    switch (this.type) {
      case 'Country': selector = FilterSelector.selectCountryFilter; break;
      case 'Education Level': selector = FilterSelector.selectEducationFilter; break;
      case 'Institutes': selector = FilterSelector.selectInstituteFilter; break;
      case 'Study Language': selector = FilterSelector.selectLanguageFilter; break;
      case 'Attendance': selector = FilterSelector.selectAttendanceFilter; break;
    }

    if (selector) {
      this.store.select(selector).subscribe((storedItems: OutputFormat[]) => {
        const storedIds = (storedItems || []).map(item => item.id || item.main);
        this.selectedIds = this.items
          .filter(item => storedIds.includes(item.id || item.main))
          .map(item => item.id);
      });
    }
  }

  private readonly languageMap: Record<string, string> = {
    EN: 'English',
    DE: 'German',
    FR: 'French',
    ES: 'Spanish',
    IT: 'Italian',
    NL: 'Dutch',
    SV: 'Swedish',
    PT: 'Portuguese'
  };

  private getFullLanguageName(code: string): string {
    return this.languageMap[code] || code;
  }

  private readonly flagMap: Record<string, string> = {
    Australia: 'AUSTRALIA',
    Austria: 'AUSTRIA',
    'United States': 'USA',
    Spain: 'SPAIN',
    'United Kingdom': 'UK',
    Luxembourg: 'LUXEMBOURG',
    Netherlands: 'NETHERLANDS',
    Switzerland: 'SWITZERLAND',
    Canada: 'CANADA',
    Sweden: 'SWEDEN',
    Germany: 'GERMANY'
  };

  private getFlagCode(country: string): string {
    return this.flagMap[country] || country?.toUpperCase().replace(/\s+/g, '_') || '';
  }

  get filteredItems() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.items;

    return this.items
      .filter(item =>
        item.main?.toLowerCase().includes(term) ||
        item.additional?.toLowerCase().includes(term)
      )
      .sort((a, b) =>
        a.main.toLowerCase().indexOf(term) - b.main.toLowerCase().indexOf(term)
      );
  }

  handleSearch(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    this.searchTerm = target.value?.trim().toLowerCase() || '';
  }

  onCheckboxChange(id: string, checked: boolean) {
    this.selectedIds = checked
      ? [...this.selectedIds, id]
      : this.selectedIds.filter(itemId => itemId !== id);
  }

  applyFilter() {
    const selectedItems = this.items
      .filter(item => this.selectedIds.includes(item.id))
      .map(item => ({ main: item.main, id: item.id, ...item }));
    this.closeFilter({
      type: this.type,
      selectedItems
    });
  }

  clearAll() {
    this.selectedIds = [];
    this.store.dispatch(FilterActions.clearFilter({
      filterType: this.type
    }));
    this.store.dispatch(FilterActions.enableFilter({ enable: false }))
  }

  closeFilter(data?: any) {
    this.modalCtrl.dismiss({ ...data });
  }
}