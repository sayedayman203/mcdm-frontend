import { KeyValuePipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [KeyValuePipe, NgbProgressbarModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent implements OnChanges {
  @Input() results!: Record<string, number>;
  order: string[] = [];
  ngOnChanges(changes: SimpleChanges) {
    this.order = Object.entries(this.results)
      .sort((a, b) => (a[1] > b[1] ? 1 : -1))
      .map(([k, v]) => k);
  }
}
