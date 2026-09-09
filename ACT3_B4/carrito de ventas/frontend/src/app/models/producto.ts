export interface Producto {
  id_producto?: number;
  nombre: string;
  fecha_ingreso: string;
  stock: string;
}

export interface ItemCarrito{
  producto: Producto;
  cantidad:number;
}