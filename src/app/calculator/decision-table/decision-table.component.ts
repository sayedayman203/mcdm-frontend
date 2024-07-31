import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Decision } from '../calculator.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NeutrosophicNumberModalComponent } from './neutrosophic-number-modal/neutrosophic-number-modal.component';

@Component({
  selector: 'app-decision-table',
  standalone: true,
  imports: [FormsModule, NeutrosophicNumberModalComponent],
  templateUrl: './decision-table.component.html',
  styleUrl: './decision-table.component.scss',
})
export class DecisionTableComponent implements OnChanges {
  private modalService = inject(NgbModal);
  @Input() criterias: string[] = [];
  @Input() alternates: string[] = [];
  @Input() decisions: Decision[] = [];
  @Output() decisionsChange = new EventEmitter<Decision[]>();

  ngOnChanges(changes: SimpleChanges) {
    this.build_decisions_structure();
  }

  add_new() {
    this.decisions.push({});
    this.build_decisions_structure();
  }
  build_decisions_structure() {
    for (let i = 0; i < this.decisions.length; i++) {
      // alternates
      this.decisions[i] = Object.fromEntries(
        Object.entries(this.decisions[i]).filter(([k, v]) =>
          this.alternates.includes(k)
        )
      );

      for (let alternate of this.alternates) {
        if (!this.decisions[i][alternate]) {
          this.decisions[i][alternate] = {};
        }

        this.decisions[i][alternate] = Object.fromEntries(
          Object.entries(this.decisions[i][alternate]).filter(([k, v]) =>
            this.criterias.includes(k)
          )
        );

        // criterias
        for (let criteria of this.criterias) {
          if (!this.decisions[i][alternate][criteria]) {
            this.decisions[i][alternate][criteria] = {
              low: 0,
              mid: 0,
              high: 0,
              T: 0,
              I: 0,
              F: 0,
            };
          }
        }
      }
    }
  }
  openEdit(decision: number, alternate: string, criteria: string) {
    const modalRef = this.modalService.open(NeutrosophicNumberModalComponent);
    modalRef.componentInstance.neutrosophic_number = {
      ...this.decisions[decision][alternate][criteria],
    };
    modalRef.result.then(
      (result) => {
        this.decisions[decision][alternate][criteria] = result;
        this.decisionsChange.emit(this.decisions);
      },
      (reason) => {}
    );
  }
}
