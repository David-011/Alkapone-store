import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './template/header/header.component';
import { FooterComponent } from './template/footer/footer.component';
import { HomeComponent } from './vistas/home/home.component';
import { RopaComponent } from './vistas/ropa/ropa.component';
import { GorrasComponent } from './vistas/gorras/gorras.component';
import { AccesoriosComponent } from './vistas/accesorios/accesorios.component';
import { AuthComponent } from './vistas/auth/auth.component';
import { CarritoComponent } from './vistas/carrito/carrito.component';
import { MiCuentaComponent } from './vistas/mi-cuenta/mi-cuenta.component';
import { BusquedaComponent } from "./vistas/busqueda/busqueda.component";
import { CheckoutComponent } from './vistas/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RopaComponent,
    GorrasComponent,
    AccesoriosComponent,
    AuthComponent,
    CarritoComponent,
    MiCuentaComponent, BusquedaComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
