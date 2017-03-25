import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeedComponent } from './edit-deed.component';

describe('EditDeedComponent', () => {
  let component: EditDeedComponent;
  let fixture: ComponentFixture<EditDeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
