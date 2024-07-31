import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-string-list-input',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule, DragDropModule],
  templateUrl: './string-list-input.component.html',
  styleUrl: './string-list-input.component.scss',
})
export class StringListInputComponent {
  faTimes = faTimes;
  @Input() values: string[] = [];
  @Output() valuesChange = new EventEmitter<string[]>();

  input_value = '';

  add(): void {
    if (this.input_value) {
      this.values.push(this.input_value);
      this.input_value = '';
      this.valuesChange.emit([...this.values]);
    }
  }

  remove(index: number): void {
    this.values.splice(index, 1);

    this.valuesChange.emit([...this.values]);
  }

  drop(event: any): void {
    [this.values[event.previousIndex], this.values[event.currentIndex]] = [
      this.values[event.currentIndex],
      this.values[event.previousIndex],
    ];

    this.valuesChange.emit([...this.values]);
  }
}
