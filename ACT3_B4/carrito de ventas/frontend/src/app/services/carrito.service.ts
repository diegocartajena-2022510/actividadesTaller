import { Injectable } from "@angular/core";
import { BehaviorSubject,Observable } from "rxjs";
import { ItemCarrito, Producto } from "../models/producto";

@Injectable({
    providedIn:"root"
})

export class CarritoService{
    private listaCarrito: ItemCarrito[]=[];
    private carritoSubject= new BehaviorSubject<ItemCarrito[]>([]);

    public carrito$: Observable<ItemCarrito[]>=this.carritoSubject.asObservable();

    agregarCarrito(producto: Producto):void{
        const existe= this.listaCarrito.find(item => item.producto.id_producto === producto.id_producto);
        if(existe){
            existe.cantidad +=1;
        }else{
            this.listaCarrito.push({producto,cantidad:1})
        }
        this.carritoSubject.next([...this.listaCarrito]);
    }

    eliminarCarrito(idProducto:number):void{
        this.listaCarrito=this.listaCarrito.filter(item =>item.producto.id_producto!==idProducto)
        this.carritoSubject.next([...this.listaCarrito]);
    }

    actualizarCantidad(idProducto:number,cantidad:number):void{
        const item =this.listaCarrito.find(i=>i.producto.id_producto===idProducto);

        if(item){
            item.cantidad=cantidad;
            if(item.cantidad<=0){
                this.eliminarCarrito(idProducto);
                return;
            }
            this.carritoSubject.next([...this.listaCarrito]);
        }
    }

}