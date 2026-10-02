import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './product.service';
import { ClienteService } from './cliente.service';
import { CarritoService } from './carrito.service';
import { DetalleCarritoService } from './detalle-carrito.service';
import { PedidoService } from './pedido.service';
import { PagoService } from './pago.service';
import { PqrsService } from './pqrs.service';
import { ChatbotService } from './chatbot.service';
import { UtilityService } from './utility.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    ProductService,
    ClienteService,
    CarritoService,
    DetalleCarritoService,
    PedidoService,
    PagoService,
    PqrsService,
    ChatbotService,
    UtilityService
  ]
})
export class ServicesModule { }
