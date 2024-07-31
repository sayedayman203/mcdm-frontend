import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CriteriasConfig } from '../calculator.component';
import { KeyValuePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bwm-form',
  standalone: true,
  imports: [FormsModule, KeyValuePipe],
  templateUrl: './bwm-form.component.html',
  styleUrl: './bwm-form.component.scss',
})
export class BwmFormComponent {
  @Input() criterias: string[] = [];
  @Input() criterias_config: CriteriasConfig['values'] = {};
  @Output() criterias_configChange = new EventEmitter<
    CriteriasConfig['values']
  >();
  @Input() best_criteria: string = '';
  @Input() worst_criteria: string = '';

  onUpdate() {
    this.criterias_configChange.emit(this.criterias_config);
  }
}
