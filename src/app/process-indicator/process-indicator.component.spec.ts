import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessIndicatorComponent } from './process-indicator.component';

describe('ProcessIndicatorComponent', () => {
  let component: ProcessIndicatorComponent;
  let fixture: ComponentFixture<ProcessIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
