import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAnimesComponent } from './top-animes.component';

describe('TopAnimesComponent', () => {
  let component: TopAnimesComponent;
  let fixture: ComponentFixture<TopAnimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopAnimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopAnimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
