export interface DetalleCarrito {
    idDetalle: number;
    cantidad: number;
    subtotal: number;
    idCarrito: number;
    idProducto: number;
    nombreProducto?: string;
    precioProducto?: number;
}
