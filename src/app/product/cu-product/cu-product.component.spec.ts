import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuProductComponent } from './cu-product.component';

describe('CuProductComponent', () => {
  let component: CuProductComponent;
  let fixture: ComponentFixture<CuProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CuProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
