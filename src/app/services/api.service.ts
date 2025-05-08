import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Program } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'assets/test_data/programs.json';

  constructor(private http: HttpClient) { }

  // Get all programs
  getAllPrograms(): Observable<Program[]> {
    return this.http.get<Program[]>(this.baseUrl).pipe(
      catchError(() => of([]))
    );
  }

  // Get program by ID
  getProgramById(id: string): Observable<Program | undefined> {
    return this.getAllPrograms().pipe(
      map(programs => programs.find(p => p.id === id))
    );
  }

  // Get programs by attribute
  getProgramsByAttribute(attribute: keyof Program, value: unknown): Observable<Program[]> {
    return this.getAllPrograms().pipe(
      map(programs => programs.filter(p => p[attribute] === value))
    );
  }

  // Get all universities with their associated countries
  getAllUniversitiesWithCountries(): Observable<{ id: string, main: string, additional: string }[]> {
    return this.getAllPrograms().pipe(
      map(programs => {
        const universityMap = new Map<string, { main: string, additional: string }>();
        programs.forEach(program => {
          if (program.university && program.country) {
            universityMap.set(program.id, {
              main: program.university,
              additional: program.country
            });
          }
        });
        return Array.from(universityMap.entries())
          .map(([id, { main, additional }]) => ({ id, main, additional }));
      }),
      catchError(error => {
        console.error('Error getting universities with countries:', error);
        return of([]);
      })
    );
  }


  // Get all unique degree levels (no flatMap)
  getAllDegreeLevels(): Observable<{ id: string, main: string }[]> {
    return this.getAllPrograms().pipe(
      map(programs => {
        const levelMap = new Map<string, string>();
        programs.forEach(program => {
          if (program.programDetails?.degree_level) {
            levelMap.set(program.id, program.programDetails.degree_level);
          }
        });
        return Array.from(levelMap.entries())
          .map(([id, main]) => ({ id, main }))
          .sort((a, b) => a.main.localeCompare(b.main));
      }),
      catchError(error => {
        console.error('Error getting degree levels:', error);
        return of([]);
      })
    );
  }


  // Get all unique countries
  getAllCountries(): Observable<{ id: string, main: string }[]> {
    return this.getAllPrograms().pipe(
      map(programs => {
        const countryMap = new Map<string, string>();
        programs.forEach(program => {
          if (program.country) {
            countryMap.set(program.id, program.country);
          }
        });
        return Array.from(countryMap.entries()).map(([id, main]) => ({ id, main }));
      }),
      catchError(error => {
        console.error('Error getting countries:', error);
        return of([]);
      })
    );
  }
  // Get all unique categories
  getAllCategories(): Observable<{ id: string, main: string }[]> {
    return this.getAllPrograms().pipe(
      map(programs => {
        const categoryMap = new Map<string, string>();
        programs.forEach(program => {
          if (program.category) {
            categoryMap.set(program.id, program.category);
          }
        });
        return Array.from(categoryMap.entries()).map(([id, main]) => ({ id, main }));
      }),
      catchError(error => {
        console.error('Error getting categories:', error);
        return of([]);
      })
    );
  }

  // Get all unique languages (no flatMap)
  getAllLanguages(): Observable<{ id: string, main: string }[]> {
    return this.getAllPrograms().pipe(
      map(programs => {
        const languages: { id: string, main: string }[] = [];

        programs.forEach(program => {
          if (program.programDetails?.language) {
            program.programDetails.language.forEach(lang => {
              languages.push({
                id: program.id,
                main: lang
              });
            });
          }
        });
        const uniqueLanguages = Array.from(new Map(languages.map(item => [item.main, item])).values());
        return uniqueLanguages.sort((a, b) => a.main.localeCompare(b.main));
      }),
      catchError(error => {
        console.error('Error getting languages:', error);
        return of([]);
      })
    );
  }

  // Get all views
  getAllViews(): Observable<{ id: string, main: number }[]> {
    return this.getAllPrograms().pipe(
      map(programs => {
        const viewMap = new Map<string, number>();
        programs.forEach(program => {
          if (program.views) {
            viewMap.set(program.id, program.views);
          }
        });
        return Array.from(viewMap.entries()).map(([id, main]) => ({ id, main }));
      }),
      catchError(error => {
        console.error('Error getting views:', error);
        return of([]);
      })
    );
  }
} 
