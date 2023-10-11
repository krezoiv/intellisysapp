// Importar los módulos necesarios de Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { HomeRoutingModule } from './home/home-routing.module';
import { RedesisRoutingModule } from './redesis/redesis-routing.module';
import { RetelecomRoutingModule } from './retelecom/retelecom-routing.module';
import { AdministrationRoutingModule } from './administration/administration-routing.module';
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [
  // Ruta por defecto que redirige a la página de inicio de sesión
  { path: '', redirectTo: 'auth/authentication/login', pathMatch: 'full' },
  
  // Rutas que cargan módulos de forma perezosa
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((auth) => auth.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((home) => home.HomeModule),
  },
  {
    path: 'retelecom',
    loadChildren: () =>
      import('./retelecom/retelecom.module').then((retelecom) => retelecom.RetelecomModule), canActivate:[AuthGuard]
  },
  {
    path: 'redesis',
    loadChildren: () =>
      import('./redesis/redesis.module').then((redesis) => redesis.RedesisModule),
  },
  {
    path: 'administracion',
    loadChildren: () =>
      import('./administration/administration.module').then((administration)=> administration.AdministrationModule)
  }

  // Otras rutas y configuraciones de enrutamiento según sea necesario
];



@NgModule({
  // Configurar las rutas principales
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,               // Importar el módulo de rutas de autenticación
    HomeRoutingModule,               // Importar el módulo de rutas de inicio
    RedesisRoutingModule,            // Importar el módulo de rutas de Redes
    RetelecomRoutingModule,           // Importar el módulo de rutas de Retelecom
    AdministrationRoutingModule  // Importar el módulo de rutas de empleado, usuarios     // Configurar las rutas principales
    
  ],
  exports: [RouterModule]           // Exportar el módulo de enrutamiento para su uso en la aplicación
})
export class AppRoutingModule { }

