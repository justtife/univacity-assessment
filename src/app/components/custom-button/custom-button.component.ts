import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicComponents } from '../ionic-components';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
  imports: [IonicComponents]
})
export class CustomButtonComponent {
  @Input() toggle: boolean = false;
  @Input() buttonText!: string | [string, string];
  @Input() buttonIcon?: string | [string, string];
  @Input() initialState: boolean = false;
  @Input() color: 'primary' | 'secondary' = 'primary';
  @Input() position: 'start' | 'end' = 'end';
  @Input() disable: boolean = false;
  @Output() onClick = new EventEmitter<boolean>();

  isToggled: boolean = this.initialState;
  constructor() { }

  getButtonText(): string {
    if (this.toggle && Array.isArray(this.buttonText)) {
      return this.isToggled ? this.buttonText[1] : this.buttonText[0];
    }
    return this.buttonText as string;
  }

  getButtonIcon(): string | undefined {
    if (!this.buttonIcon) return undefined;
    if (this.toggle && Array.isArray(this.buttonIcon)) {
      return this.isToggled ? this.buttonIcon[1] : this.buttonIcon[0];
    }
    return this.buttonIcon as string;
  }

  get showIcon(): boolean {
    return !!this.buttonIcon;
  }

  handleClick() {
    if (this.toggle) {
      this.isToggled = !this.isToggled;
    }
    this.onClick.emit(this.isToggled);
  }
}
