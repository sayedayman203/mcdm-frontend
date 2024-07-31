import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StringListInputComponent } from './string-list-input.component';

describe('StringListInputComponent', () => {
  let component: StringListInputComponent;
  let fixture: ComponentFixture<StringListInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StringListInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StringListInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
