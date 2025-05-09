import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Program } from '../../models';
import { ApiService } from '../../services/api.service';
import SharedComponents from 'src/app/components/components';
import { IonicComponents } from 'src/app/components/ionic-components';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.page.html',
  styleUrls: ['./program-detail.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [SharedComponents, IonicComponents],

  // Animation for collapsing/expanding long text sections
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '80px',
        opacity: '1',
        overflow: 'hidden',
        // Creates a fade-out effect at the bottom when collapsed
        'mask-image': 'linear-gradient(to bottom, black 80%, transparent 100%)'
      })),
      state('expanded', style({
        opacity: '1',
        overflow: 'visible',
        'mask-image': 'none'
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class ProgramDetailPage implements OnInit {
  public program: Program | null = null;
  public isLoading: boolean = true;
  public showFullDescription: boolean = false;
  public showFullStructure: boolean = false;
  public showFullRequirements: boolean = false;
  public error: string | null = null;
  // Map full country names to country code abbreviations
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
  flagDir = '';
  formattedLanguages = '';

  constructor(
    private readonly route: ActivatedRoute,
    private router: Router,
    private readonly apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.loadProgramDetails();

  }

  //Loads program data based on route param ID
  private loadProgramDetails(): void {
    const programId = this.route.snapshot.paramMap.get('id');

    if (!programId) {
      this.handleError('Invalid program ID');
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.apiService.getProgramById(programId)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (program: Program | any) => {
          this.program = program || null;
          this.flagDir = this.getFlagCode(program.country || '');
          this.formattedLanguages = this.getLanguageList(program.programDetails.language);
          if (!program) this.handleError('Program not found');
        },
        error: (err) => {
          console.error('Program load error:', err);
          this.handleError('Failed to load program details');
        }
      });
  }

  // Handles error state
  private handleError(message: string): void {
    this.error = message;
    this.isLoading = false;
    this.program = null;
  }

  // Toggle methods for showing/hiding expandable sections
  public toggleDescription(): void {
    this.showFullDescription = !this.showFullDescription;
  }

  public toggleStructure(): void {
    this.showFullStructure = !this.showFullStructure;
  }

  public toggleRequirements(): void {
    this.showFullRequirements = !this.showFullRequirements;
  }

  private getFlagCode(country: string): string {
    return this.flagMap[country] || country.toUpperCase();
  }
  private getFullLanguageName(code: string): string {
    return this.languageMap[code.toUpperCase()] || code;
  }

  private getLanguageList(codes: string[]): string {
    if (!codes?.length) return '';

    const fullNames = codes.map(code => this.getFullLanguageName(code));

    if (fullNames.length === 1) {
      return fullNames[0];
    }

    if (fullNames.length === 2) {
      return fullNames.join(' and ');
    }

    return `${fullNames.slice(0, -1).join(', ')} and ${fullNames[fullNames.length - 1]}`;
  }
  // Determines if content should be collapsible 
  public needsToggle(content: string): boolean {
    return content.length > 300;
  }
  goBack() {
    this.router.navigate(['/'])
  }
}
