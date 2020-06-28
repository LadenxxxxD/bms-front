import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankBoardComponent } from './rank-board.component';

describe('RankBoardComponent', () => {
  let component: RankBoardComponent;
  let fixture: ComponentFixture<RankBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
