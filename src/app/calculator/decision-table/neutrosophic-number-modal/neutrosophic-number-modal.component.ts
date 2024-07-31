import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export interface NeutrosophicNumber {
  low: number;
  mid: number;
  high: number;
  T: number;
  I: number;
  F: number;
}

@Component({
  selector: 'app-neutrosophic-number-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './neutrosophic-number-modal.component.html',
  styleUrl: './neutrosophic-number-modal.component.scss',
})
export class NeutrosophicNumberModalComponent {
  activeModal = inject(NgbActiveModal);

  @Input() neutrosophic_number: NeutrosophicNumber = {
    low: 0,
    mid: 0,
    high: 0,
    T: 0,
    I: 0,
    F: 0,
  };

  validate_range(key: keyof NeutrosophicNumber) {
    if (this.neutrosophic_number[key] < 0) this.neutrosophic_number[key] = 0;
    else if (this.neutrosophic_number[key] > 1)
      this.neutrosophic_number[key] = 1;
  }
}
