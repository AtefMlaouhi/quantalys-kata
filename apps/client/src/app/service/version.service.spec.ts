/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { VersionService } from './version.service';

describe('Service: Version', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VersionService]
    });
  });

  it('should create service', inject([VersionService], (service: VersionService) => {
    expect(service).toBeTruthy();
  }));

  it('should return the correct version', inject([VersionService], async (service: VersionService) => {
    const version = await service.getVersion();
    expect(version).toBe('1.0.0');
  }));
});
