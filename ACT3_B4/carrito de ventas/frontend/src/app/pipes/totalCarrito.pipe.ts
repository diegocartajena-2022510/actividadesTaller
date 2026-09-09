import {Pipe,PipeTransform} from "@angular/core";
import { ItemCarrito } from "../models/producto";

@Pipe({
    name: "totalCarrito",
    standalone:true
})

export class TotalCarritoPipe implements PipeTransform{
    transform(items: ItemCarrito[]|null) {
        if(!items) return 0;
        return items.reduce((total, item) => total + (Number(item.producto.stock) * item.cantidad), 0);
    }
}