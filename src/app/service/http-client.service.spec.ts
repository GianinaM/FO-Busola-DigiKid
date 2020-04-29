import { TestBed } from '@angular/core/testing';

import { HttpClientService } from './http-client.service';
import { AppModule } from '../app.module';

describe('HttpClientService', () => {
  let service: HttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClientService],
      imports: [AppModule,
      ],
    });
    service = TestBed.inject(HttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
