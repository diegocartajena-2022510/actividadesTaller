import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto';
import { Producto,ItemCarrito } from '../../models/producto';
import { CarritoService } from '../../services/carrito.service';
import { TotalCarritoPipe } from '../../pipes/totalCarrito.pipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, FormsModule,TotalCarritoPipe],
  templateUrl: './producto.html',
  styleUrls: ['./producto.css'],
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = [];
  carrito$: Observable<ItemCarrito[]>;

  productoForm: Producto = {
    nombre: '',
    fecha_ingreso: '',
    stock: ''
  };

  esEdicion: boolean = false;
  idEdicion?: number;

  constructor(
    private productoService: ProductoService,
    private cdr:ChangeDetectorRef,
    private carritoService:CarritoService
    
  ) {
    this.carrito$=this.carritoService.carrito$;
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  agregarCarrito(producto:Producto):void{
    this.carritoService.agregarCarrito(producto);
  }
  eliminarCarrito(idProducto?:number):void{
    if(idProducto){
      this.carritoService.eliminarCarrito(idProducto);
    }
  }
  actualizarCantidad(idProducto?: number, cantidad?: any): void {
  if (idProducto !== undefined) {
    const nuevaCantidad = Number(cantidad);
    this.carritoService.actualizarCantidad(idProducto, nuevaCantidad);
  }
}
  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data; 
        this.cdr.detectChanges()
      },
      error: (err) => console.error(err)
    });
  }

  seleccionarParaEditar(producto: Producto): void {
    this.esEdicion = true;
    this.idEdicion = producto.id_producto;

    // Formatear la fecha para el input type="date"
    const fechaFormateada = producto.fecha_ingreso 
      ? producto.fecha_ingreso.split('T')[0] 
      : '';

    this.productoForm = {
      nombre: producto.nombre,
      fecha_ingreso: fechaFormateada,
      stock: producto.stock
    };
  }

  guardarProducto(): void {
    if (this.esEdicion && this.idEdicion) {
      this.productoService.actualizarProducto(this.idEdicion, this.productoForm).subscribe({
        next: () => {
          this.cargarProductos();
          this.limpiarFormulario();
        }
      });
    } else {
      this.productoService.crearProducto(this.productoForm).subscribe({
        next: () => {
          this.cargarProductos();
          this.limpiarFormulario();
        }
      });
    }
  }

  limpiarFormulario(): void {
    this.esEdicion = false;
    this.idEdicion = undefined;
    this.productoForm = { nombre: '', fecha_ingreso: '', stock: '' };
  }

  eliminar(id?: number): void {
    if (id && confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe({
        next: () => this.cargarProductos(),
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }
}