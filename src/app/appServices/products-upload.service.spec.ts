import { TestBed } from '@angular/core/testing';

import { ProductsUploadService } from './products-upload.service';

describe('ProductsUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductsUploadService = TestBed.get(ProductsUploadService);
    expect(service).toBeTruthy();
  });
});
