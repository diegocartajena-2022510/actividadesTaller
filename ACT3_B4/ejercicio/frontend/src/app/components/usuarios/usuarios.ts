import {Component,OnInit,ChangeDetectorRef} from '@angular/core';
 
import {CommonModule} from '@angular/common';
 
import {operacionPipe} from '../../pipes/mayusculas.pipe';
import { FormsModule } from '@angular/forms';
 
@Component({
    selector: 'app-usuarios',
    standalone: true,
    imports: [
        CommonModule,
        operacionPipe,
        FormsModule,
    ],
 
    templateUrl:
        './usuarios.html'
 
})
export class UsuariosComponent{
    num1: number | null=null;
    num2: number | null=null;
    operacionE:string=" ";

    setOperacion(operacion:string):void{
        this.operacionE=operacion;
    }
}
    


    
 