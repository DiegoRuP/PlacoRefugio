import { TestBed } from '@angular/core/testing';

import { ObtencionNodeJSService } from './obtencion-node-js.service';

describe('ObtencionNodeJSService', () => {
  let service: ObtencionNodeJSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObtencionNodeJSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
