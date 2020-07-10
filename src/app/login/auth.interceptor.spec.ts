import { TestBed } from '@angular/core/testing';

import { AddHeaderInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AddHeaderInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: AddHeaderInterceptor = TestBed.inject(AddHeaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
