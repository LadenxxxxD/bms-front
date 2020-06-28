import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryAdminComponent } from './query-admin.component';

describe('QueryAdmiComponent', () => {
  let component: QueryAdminComponent;
  let fixture: ComponentFixture<QueryAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QueryAdminComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
