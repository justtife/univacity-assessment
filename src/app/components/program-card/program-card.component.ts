import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { IonicComponents } from '../ionic-components';
import {
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';
import { Program } from 'src/app/models';

@Component({
  selector: 'app-program-card',
  templateUrl: './program-card.component.html',
  styleUrls: ['./program-card.component.scss'],
  standalone: true,
  imports: [IonCardContent, IonCard, IonicComponents]
})
export class ProgramCardComponent implements OnInit {
  @Input() data!: Program;
  @Output() onProgramClick = new EventEmitter<Program>();

  formattedLanguages = '';
  flagDir = '';

  // Map short language codes to full names
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

  constructor() { }

  ngOnInit() {
    // Format the language list for display
    this.formattedLanguages = this.getLanguageList(this.data.programDetails.language);

    this.flagDir = this.getFlagCode(this.data.country || '');
  }

  programClick(): void {
    this.onProgramClick.emit(this.data);
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

  private getFlagCode(country: string): string {
    return this.flagMap[country] || country.toUpperCase();
  }
}
