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
  getAllUniversitiesWithCountries(): Observable<{ main: string; additional: string }[]> {
    return this.getAllPrograms().pipe(
      map(programs => {
        const universityMap = new Map<string, string>();
        programs.forEach(program => {
          if (program.university && program.country) {
            universityMap.set(program.university, program.country);
          }
        });

        // Convert Map to array of objects with 'main' and 'additional' keys
        return Array.from(universityMap.entries()).map(([university, country]) => ({
          main: university,
          additional: country
        }));
      }),
      catchError(error => {
        console.error('Error getting universities with countries:', error);
        return of([]);
      })
    );
  }


  // Get all unique degree levels (no flatMap)
  getAllDegreeLevels(): Observable<{ main: string }[]> {
    return this.getAllPrograms().pipe(
      map(programs => {
        const allLevels: string[] = [];
        programs.forEach(program => {
          if (program.programDetails?.degree_level) {
            allLevels.push(program.programDetails.degree_level);
          }
        });

        const uniqueSortedLevels = Array.from(new Set(allLevels)).sort();

        return uniqueSortedLevels.map(level => ({ main: level }));
      }),
      catchError(error => {
        console.error('Error getting degree levels:', error);
        return of([]);
      })
    );
  }


  // Get all unique countries
  getAllCountries(): Observable<{ main: string }[]> {
    return this.getAllPrograms().pipe(
      map(programs => {
        const uniqueCountries = Array.from(new Set(programs.map(p => p.country)));
        return uniqueCountries.map(country => ({ main: country }));
      }),
      catchError(error => {
        console.error('Error getting countries:', error);
        return of([]);
      })
    );
  }

  // Get all unique languages (no flatMap)
  getAllLanguages(): Observable<{ main: string }[]> {
    return this.getAllPrograms().pipe(
      map(programs => {
        const languages: string[] = [];
        programs.forEach(program => {
          if (program.programDetails?.language) {
            languages.push(...program.programDetails.language);
          }
        });
        const uniqueSortedLanguages = Array.from(new Set(languages)).sort();
        return uniqueSortedLanguages.map(language => ({ main: language }));
      }),
      catchError(error => {
        console.error('Error getting languages:', error);
        return of([]);
      })
    );
  }

  // Get all views
  getAllViews(): Observable<number> {
    return this.getAllPrograms().pipe(
      map(programs => programs.reduce((sum, p) => sum + (p.views ?? 0), 0))
    );
  }
}
