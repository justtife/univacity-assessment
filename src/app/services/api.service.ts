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

  // Get all unique universities
  getAllUniversities(): Observable<string[]> {
    return this.getAllPrograms().pipe(
      map(programs => Array.from(new Set(programs.map(p => p.university))))
    );
  }

  // Get all unique degree levels (no flatMap)
  getAllDegreeLevels(): Observable<string[]> {
    return this.getAllPrograms().pipe(
      map(programs => {
        const allLevels: string[] = [];
        for (const p of programs) {
          for (const detail of p.programDetails || []) {
            if (detail.name === 'Degree Level' && detail.value) {
              allLevels.push(String(detail.value));
            }
          }
        }
        return Array.from(new Set(allLevels));
      })
    );
  }

  // Get all unique countries
  getAllCountries(): Observable<string[]> {
    return this.getAllPrograms().pipe(
      map(programs => Array.from(new Set(programs.map(p => p.country))))
    );
  }

  // Get all unique languages (no flatMap)
  getAllLanguages(): Observable<string[]> {
    return this.getAllPrograms().pipe(
      map(programs => {
        const languages: string[] = [];
        for (const p of programs) {
          for (const detail of p.programDetails || []) {
            if (detail.name === 'Language') {
              const value = detail.value;
              if (Array.isArray(value)) {
                languages.push(...value.map(String));
              } else if (value) {
                languages.push(String(value));
              }
            }
          }
        }
        return Array.from(new Set(languages));
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
