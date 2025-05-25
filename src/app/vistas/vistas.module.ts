import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import { GorrasComponent } from './gorras/gorras.component';
import { AccesoriosComponent } from './accesorios/accesorios.component';
import { RopaComponent } from './ropa/ropa.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProductosComponent,
    GorrasComponent,
    AccesoriosComponent,
    RopaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeComponent,
    ProductosComponent,
    GorrasComponent,
    AccesoriosComponent
  ]
})
export class VistasModule { }
