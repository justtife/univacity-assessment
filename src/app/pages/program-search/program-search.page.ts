import { Component, OnInit } from '@angular/core';
import SharedComponents from 'src/app/components/components';
import { IonicComponents } from 'src/app/components/ionic-components';
import { UtilityService } from 'src/app/services/utility.service';
import { FilterModalComponent } from 'src/app/components/filter-modal/filter-modal.component';
import { Store } from '@ngrx/store';
import { ProgramActions } from 'src/app/@ngrx/actions/program.action';
import { Observable, switchMap, forkJoin, combineLatest } from 'rxjs';
import { ProgramSelector } from "../../@ngrx/selectors/program.selector"
import { Router } from '@angular/router';
import { Program } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';
import { FilterActions } from 'src/app/@ngrx/actions/filter.action';
import { FilterSelector } from 'src/app/@ngrx/selectors/filter.selector';

@Component({
  selector: 'app-program-search',
  templateUrl: './program-search.page.html',
  styleUrls: ['./program-search.page.scss'],
  standalone: true,
  imports: [IonicComponents, SharedComponents]
})
export class ProgramSearchPage implements OnInit {
  programs: Program[] = [];
  categories$ = this.store.select(ProgramSelector.selectAllCategories);
  filteredProgramCount$ = this.store.select(ProgramSelector.selectFilteredProgramsCount);
  filteredProgramIds$ = this.store.select(ProgramSelector.selectFilteredProgramIds);
  enableFilter = this.store.select(FilterSelector.selectEnableFilter);
  loading: Observable<boolean> = this.store.select(ProgramSelector.selectProgramsLoading);

  constructor(
    private store: Store,
    private router: Router,
    private uS: UtilityService,
    private apiService: ApiService
  ) {
    this.store.dispatch(ProgramActions.getAllPrograms());
  }

  ngOnInit() {
    this.categories$.subscribe((res) => {
      console.log(res)
    })
    combineLatest([this.filteredProgramIds$, this.enableFilter])
      .pipe(
        switchMap(([ids, isEnabled]) => {
          if (!isEnabled || ids.length === 0) {
            return this.apiService.getAllPrograms();
          }

          const requests = ids.map(program => this.apiService.getProgramById(program.id));
          return forkJoin(requests);
        })
      )
      .subscribe(programs => {
        // Remove undefined entries in case any ID didn't match
        this.programs = programs.filter((p): p is Program => !!p);
      });

  }


  showFilter() {
    this.uS.dialogOpener(FilterModalComponent, (data) => {
      this.store.dispatch(FilterActions.enableFilter({ enable: data.enableFilter }))
    }, null, null);
  }

  removeFilter(id: string) {
    console.log(id)
    this.store.dispatch(FilterActions.removeFilterById({ id }))
    this.filteredProgramIds$.subscribe((res) => { console.log(res) })
  }

  programDetail(programDetail: Program) {
    const course = programDetail.title.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/-$/, '')
      .replace(/^-/, '');

    this.router.navigate(['/programs/detail', programDetail.id, course]);
  }
}
