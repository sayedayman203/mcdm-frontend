import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BwmFormComponent } from './bwm-form.component';

describe('BwmFormComponent', () => {
  let component: BwmFormComponent;
  let fixture: ComponentFixture<BwmFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BwmFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BwmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
