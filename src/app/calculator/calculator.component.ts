import { Component, OnChanges, SimpleChanges, inject } from '@angular/core';
import { StringListInputComponent } from './string-list-input/string-list-input.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { BwmFormComponent } from './bwm-form/bwm-form.component';
import { FormsModule } from '@angular/forms';
import { DecisionTableComponent } from './decision-table/decision-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { NeutrosophicNumber } from './decision-table/neutrosophic-number-modal/neutrosophic-number-modal.component';
import { get_example } from '../examples/example';
import { HttpService } from '../http/http.service';
import { ResultsComponent } from './results/results.component';

export interface CriteriasConfig {
  values: {
    [key: string]: {
      beneficial: boolean;
      compared2best: number;
      compared2worst: number;
    };
  };
  best_criteria: string;
  worst_criteria: string;
}
export interface Decision {
  [key: string]: {
    [key: string]: NeutrosophicNumber;
  };
}

@Component({
  selector: 'app-calculator',
  standalone: true,
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
  imports: [
    NgbAccordionModule,
    FormsModule,
    StringListInputComponent,
    BwmFormComponent,
    DecisionTableComponent,
    ResultsComponent,
    FontAwesomeModule,
  ],
})
export class CalculatorComponent {
  faAdd = faAdd;
  httpService = inject(HttpService);

  criterias: string[] = [];
  alternates: string[] = [];
  criterias_config: CriteriasConfig = {
    values: {},
    best_criteria: '',
    worst_criteria: '',
  };
  decisions: Decision[] = [];
  // solution
  results?: Record<string, number>;
  ngOnInit() {
    // this.onCriteriasChanges();
  }

  onCriteriasChanges() {
    this.criterias_config.values = Object.fromEntries(
      Object.entries(this.criterias_config.values).filter(([k, v]) =>
        this.criterias.includes(k)
      )
    );

    for (let criteria of this.criterias) {
      if (!this.criterias_config.values[criteria]) {
        this.criterias_config.values[criteria] = {
          beneficial: true,
          compared2best: 0,
          compared2worst: 0,
        };
      }
    }
  }

  lead_example() {
    const { criterias, alternates, criterias_config, decisions } =
      get_example();
    this.criterias = criterias;
    this.alternates = alternates;
    this.criterias_config = criterias_config;
    this.decisions = decisions;
  }

  solve() {
    const payload = {
      criterias_config: this.criterias_config,
      alternates: this.alternates,
      decisions: this.decisions.map((d) =>
        this.alternates.map((a) => this.criterias.map((c) => d[a][c]))
      ),
    };
    this.httpService.calculate(payload).subscribe({
      next: (results: any) => {
        this.results = results;
      },
    });
  }
}
