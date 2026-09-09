import { Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full'
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
  }
];