import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CognitoService } from '@shared/services/cognito.service';

@Injectable({
  providedIn: 'root'
})
export class PublicoGuard implements CanActivate {

  constructor(private router: Router, private authService: CognitoService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> {

        const comercio = this.authService.esComercio();
        const usuario = this.authService.esUsuario();


    if(!comercio && !usuario){
      return true;
    }
    else{
      return this.router.createUrlTree(['']);
    }
  }
}
