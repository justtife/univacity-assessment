import { Component } from '@angular/core';
import SharedComponents from 'src/app/components/components';
import { IonicComponents } from 'src/app/components/ionic-components';
import { UtilityService } from 'src/app/services/utility.service';
import { FilterModalComponent } from 'src/app/components/filter-modal/filter-modal.component';
import { Store } from '@ngrx/store';
import { ProgramActions } from 'src/app/@ngrx/actions/program.action';
import { Observable } from 'rxjs';
import { ProgramSelector } from "../../@ngrx/selectors/program.selector"
import { Router } from '@angular/router';
@Component({
  selector: 'app-program-search',
  templateUrl: './program-search.page.html',
  styleUrls: ['./program-search.page.scss'],
  standalone: true,
  imports: [IonicComponents, SharedComponents]
})
export class ProgramSearchPage {
  programs: Observable<any[]> = this.store.select(ProgramSelector.selectAllPrograms);
  loading: Observable<boolean> = this.store.select(ProgramSelector.selectProgramsLoading);
  constructor(private store: Store, private router: Router, private uS: UtilityService) {
    this.store.dispatch(ProgramActions.getAllPrograms());
  }

  activeFilters = [
    'Design',
    'Programming',
    'Project Management',
    'Data Science',
    'Cybersecurity',
    'Cloud Computing',
    'UI/UX'
  ];
  showFilter() {
    this.uS.dialogOpener(FilterModalComponent, () => { }, null, null)
  }
  removeFilter(filter: string) {
    this.activeFilters = this.activeFilters.filter(f => f !== filter);
  }
  programDetail(id: string, title: string) {
    const course = title.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/-$/, '')
      .replace(/^-/, '')
    this.router.navigate(['/programs/detail', id, course])
  }
}
