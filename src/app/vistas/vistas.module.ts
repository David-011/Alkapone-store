import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { RopaComponent } from './ropa/ropa.component';
import { GorrasComponent } from './gorras/gorras.component';
import { AccesoriosComponent } from './accesorios/accesorios.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    HomeComponent,
    RopaComponent,
    GorrasComponent,
    AccesoriosComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule   // <-- Aquí debe ir para que funcione app-menu en HomeComponent
  ],
  exports: [
    HomeComponent,
    RopaComponent,
    GorrasComponent,
    AccesoriosComponent,
    // No es necesario exportar ComponentsModule aquí a menos que otro módulo lo necesite
  ]
})
export class VistasModule { }
