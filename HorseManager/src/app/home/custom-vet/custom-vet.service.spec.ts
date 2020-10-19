import { TestBed } from '@angular/core/testing';

import { CustomVetService } from './custom-vet.service';

describe('CustomVetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomVetService = TestBed.get(CustomVetService);
    expect(service).toBeTruthy();
  });
});
