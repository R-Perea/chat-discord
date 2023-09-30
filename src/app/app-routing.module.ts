import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'login', // Ruta para la página de inicio de sesión
    loadChildren: () => import('./login/login.component').then(m => m.LoginComponent) 
  },
  {
    path: 'chat', // Ruta para la página de chat
    loadChildren: () => import('./chat/chat.component').then(m => m.ChatComponent)
  },
  {
    path: '', // Ruta vacía
    redirectTo: 'login', // Redirigir a la página de inicio de sesión por defecto
    pathMatch: 'full'
  },
  // Puedes agregar más rutas según sea necesario
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
