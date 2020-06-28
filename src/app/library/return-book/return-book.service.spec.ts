import { TestBed } from '@angular/core/testing';

import { ReturnBookService } from './return-book.service';

describe('ReturnBookService', () => {
  let service: ReturnBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReturnBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
