export interface Cliente {
    idCliente: number;
    nombre: string;
    apellido: string;
    correo: string;
    contrasena: string;
    direccion: string | null;
    telefono: string | null;
}
