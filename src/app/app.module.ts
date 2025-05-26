import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';  // rutas
import { AppComponent } from './app.component';

import { VistasModule } from './vistas/vistas.module';      // donde están home, ropa, gorras, accesorios
import { ComponentsModule } from './components/components.module';
import { ServicesModule } from './services/services.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VistasModule,
    ComponentsModule,
    ServicesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
