export interface Pedido {
    idPedido: number;
    fechaPedido: Date;
    estadoPedido: string;
    idCliente: number;
    idCarrito: number;
    nombreCliente?: string;
    apellidoCliente?: string;
}
