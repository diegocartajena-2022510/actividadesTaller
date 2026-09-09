import {
    Pipe,
    PipeTransform
} from '@angular/core';
 
@Pipe({
    name: 'operacion',
    standalone: true
})
export class operacionPipe implements PipeTransform{
    
    transform(num1: number | null, tipoOperacion: string, num2: number | null = null): string | number{
       if(num1===null ||num1===undefined){
        return "";
       }
       const val1= Number(num1);
       const val2= Number(num2);
       switch(tipoOperacion){
            case "sumar":
                return val1+val2;
            case "restar":
                return val1-val2;
            case "multiplicar":
                return val1*val2;

            case "dividir":
                if(val2===0){
                    return "No se puede dividir entre 0";
                }else{
                    return val1/val2;
                };

            case "raiz":
                if(val1<0){
                    return "No se puede calcular la raíz cuadrada de un número negativo";
                }else{
                    return Math.sqrt(val1);
                }
            default:
                return "operación no válida";
       }
    }

}