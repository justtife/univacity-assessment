import { Component, OnInit, Input } from '@angular/core';
import { IonicComponents } from '../ionic-components';
import { IonCard, IonCardContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-program-card',
  templateUrl: './program-card.component.html',
  styleUrls: ['./program-card.component.scss'],
  imports: [IonCardContent, IonCard, IonicComponents]
})
export class ProgramCardComponent implements OnInit {
  @Input() imageUrl = '';
  @Input() bannerIcon = 'star';
  @Input() bannerText = 'Featured';
  @Input() profileImage = '';
  @Input() title = 'Program Title';
  @Input() infoIcon = 'school';
  @Input() university = 'University Program';
  @Input() options: { icon: string; label: string }[] = [];
  @Input() price = '$1200';
  @Input() currency = 'EUR';
  @Input() language = 'English';
  constructor() { }

  ngOnInit() { }

}
