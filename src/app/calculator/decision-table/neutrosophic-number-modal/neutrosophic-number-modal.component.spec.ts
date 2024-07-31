import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeutrosophicNumberModalComponent } from './neutrosophic-number-modal.component';

describe('NeutrosophicNumberModalComponent', () => {
  let component: NeutrosophicNumberModalComponent;
  let fixture: ComponentFixture<NeutrosophicNumberModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeutrosophicNumberModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeutrosophicNumberModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
