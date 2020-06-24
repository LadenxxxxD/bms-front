import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesttableComponent } from './testtable.component';

describe('TesttableComponent', () => {
  let component: TesttableComponent;
  let fixture: ComponentFixture<TesttableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesttableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesttableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
