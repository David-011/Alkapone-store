import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { ProductFormComponent } from './product-form/product-form.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ProductTableComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
