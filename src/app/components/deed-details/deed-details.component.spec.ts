import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeedDetailsComponent } from './deed-details.component';

describe('DeedDetailsComponent', () => {
  let component: DeedDetailsComponent;
  let fixture: ComponentFixture<DeedDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeedDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
