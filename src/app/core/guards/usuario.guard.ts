import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {

    // Aquí implementa tu lógica de validación de roles para el guard de usuario

    // Ejemplo: Permitir acceso solo a usuarios autenticados
    const isLoggedIn = true// Reemplaza esto con tu lógica para verificar si el usuario está autenticado

    if (isLoggedIn) {
      return true; // Permite el acceso a la ruta
    } else {
      // Redirige a la página de inicio de sesión
      return this.router.createUrlTree(['']);
    }
  }
}
