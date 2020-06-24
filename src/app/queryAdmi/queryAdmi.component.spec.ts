import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryAdmiComponent } from './queryAdmi.component';

describe('QueryAdmiComponent', () => {
  let component: QueryAdmiComponent;
  let fixture: ComponentFixture<QueryAdmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryAdmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryAdmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
