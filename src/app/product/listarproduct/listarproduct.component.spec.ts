import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarproductComponent } from './listarproduct.component';

describe('ListarproductComponent', () => {
  let component: ListarproductComponent;
  let fixture: ComponentFixture<ListarproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarproductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
