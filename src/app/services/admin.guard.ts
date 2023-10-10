import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})

export class AdminGuard implements CanActivate{

  constructor(private loginService:LoginService,private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log('in admin guard')
      if(this.loginService.isLogin()&&this.loginService.getUserRole()==='Admin'){
          return true;
      }
      this.router.navigate(['login'])

    return false;
  }




  //   adminGuard: CanActivateFn = (route, state) => {
  //     console.log('in admin guard')
  //     if(this.loginService.isLogin()&&this.loginService.getUserRole()==='ADMIN'){
  //         return true;
  //     }
  //     this.router.navigate(['login'])

  //   return false;
  // };
}