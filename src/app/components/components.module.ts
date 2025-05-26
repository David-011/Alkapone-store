import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ProductTableComponent,
    ProductFormComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
     RouterModule
  ],
  exports: [
    MenuComponent,
    NavbarComponent,
    FooterComponent,
    ProductTableComponent,
    ProductFormComponent
  ]
})
export class ComponentsModule { }
