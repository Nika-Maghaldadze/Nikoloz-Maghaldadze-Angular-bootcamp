import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() type: string = '';
  @Input() size: string = '';

  @Output() clicked = new EventEmitter<void>();

  hoverClass: string = '';
  activeClass: string = '';
  sizeClass: string = '';
  disabledClass: string = '';
  isIcon: boolean = false;

  withoutIcons = ['heart', 'share', 'star', 'x'];

  ngOnInit(): void {
    const labelLower = this.label.toLowerCase();
    const typeLower = this.type.toLowerCase();

    this.hoverClass = labelLower === 'hover' ? `${this.type}-hover` : '';
    this.activeClass = labelLower === 'active' ? `${this.type}-active` : '';

    this.sizeClass =
      this.size.toLowerCase() === 'extra large'
        ? 'x-large'
        : this.size.toLowerCase();

    const isOutline = typeLower.includes('outline');
    if (this.disabled && isOutline) {
      this.disabledClass = 'disabled-outline';
    } else if (this.disabled) {
      this.disabledClass = 'disabled';
    } else {
      this.disabledClass = '';
    }

    this.isIcon = [
      'download',
      'confirm',
      'delete',
      'edit',
      'loading',
      'heart',
      'share',
      'star',
      'x',
    ].includes(labelLower);
  }

  clickMe(): void {
    if (this.disabled) return;
    this.clicked.emit();
  }
}
