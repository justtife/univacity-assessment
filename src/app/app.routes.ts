import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'programs',
    children: [
      {
        path: 'search',
        loadComponent: () => import('./pages/program-search/program-search.page').then(m => m.ProgramSearchPage)
      },
      {
        path: 'detail',
        loadComponent: () => import('./pages/program-detail/program-detail.page').then(m => m.ProgramDetailPage)
      },
    ]
  },
  {
    path: '',
    redirectTo: 'programs/search',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'programs/search',
  },

];
