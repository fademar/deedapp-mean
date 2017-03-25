import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeedComponent } from './add-deed.component';

describe('AddDeedComponent', () => {
  let component: AddDeedComponent;
  let fixture: ComponentFixture<AddDeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
