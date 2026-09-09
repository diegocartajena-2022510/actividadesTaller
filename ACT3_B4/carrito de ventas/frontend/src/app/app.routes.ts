import { Routes } from '@angular/router';
import { ProductoComponent } from './components/producto/producto';

export const routes: Routes = [
  { path: '', component: ProductoComponent }, // Muestra la vista de productos al entrar a http://localhost:4200
  { path: '**', redirectTo: '' } // Redirige cualquier ruta no encontrada al inicio
];