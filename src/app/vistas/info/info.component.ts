import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const CONTENIDO: any = {
  'preguntas-frecuentes': {
    titulo: 'Preguntas frecuentes',
    parrafos: [
      'Como compro? Agrega los productos al carrito, inicia sesion y confirma tu pedido en el checkout.',
      'Que metodos de pago hay? Pago contra entrega o transferencia.',
      'Cuanto tarda mi pedido? Entre 2 y 5 dias habiles a todo Colombia.',
      'Necesito una cuenta para comprar? Si, para registrar tu pedido y ver tu informacion en Mi Cuenta.',
      'Como me contacto? Escribenos por WhatsApp al 311 372 3095 o desde el formulario de PQRS.'
    ]
  },
  'envios': {
    titulo: 'Envios y entregas',
    parrafos: [
      'Enviamos a todo Colombia. El tiempo de entrega es de 2 a 5 dias habiles despues de confirmar el pedido.',
      'El envio es gratis en compras superiores a $150.000. Por debajo de ese valor el costo es de $12.000.',
      'Recibiras la informacion de tu pedido en los datos de contacto que registres al comprar.'
    ]
  },
  'cambios': {
    titulo: 'Cambios y devoluciones',
    parrafos: [
      'Tienes 30 dias para solicitar cambios o devoluciones desde que recibes tu pedido.',
      'El producto debe estar sin uso, con su empaque y etiquetas originales.',
      'Para iniciar el proceso, escribenos desde el formulario de PQRS indicando el numero de tu pedido.'
    ]
  },
  'terminos': {
    titulo: 'Terminos y condiciones',
    parrafos: [
      'Alkapone Store es un proyecto academico desarrollado para la asignatura Despliegue del Sistema.',
      'Los pedidos realizados en este sitio se registran en la base de datos del proyecto y no generan ningun cobro real.',
      'Los precios y la disponibilidad de los productos pueden cambiar sin previo aviso.'
    ]
  },
  'privacidad': {
    titulo: 'Politica de privacidad',
    parrafos: [
      'Guardamos los datos que nos entregas al registrarte y comprar (nombre, correo, direccion y telefono) solo para procesar tus pedidos y atender tus solicitudes.',
      'No compartimos tu informacion con terceros.',
      'Puedes pedir la correccion o eliminacion de tus datos desde el formulario de PQRS.'
    ]
  }
};

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  titulo = '';
  parrafos: string[] = [];

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(p => {
      const c = CONTENIDO[p.get('tema') || ''];
      this.titulo = c ? c.titulo : 'Pagina no encontrada';
      this.parrafos = c ? c.parrafos : ['La pagina que buscas no existe.'];
    });
  }
}
