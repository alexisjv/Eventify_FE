import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Rol } from '@core/enums/Rol.enum';
import { CognitoService } from '@shared/services/cognito.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {

  constructor(private router: Router, private authService: CognitoService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> {

      const publico = this.authService.esPublico();
      const comercio = this.authService.esComercio();

    if(this.authService.esUsuario() || publico && !comercio){
      return true;
    }
    else{
      return this.router.createUrlTree(['']);
    }
  }
}
