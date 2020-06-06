import { TestBed } from '@angular/core/testing';

import { ManegeTimeTableService } from './manege-time-table-service.service';

describe('ManegeTimeTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManegeTimeTableService = TestBed.get(ManegeTimeTableService);
    expect(service).toBeTruthy();
  });
});
