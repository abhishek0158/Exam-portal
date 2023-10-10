import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn:'root'
})

export class NormalGuard implements CanActivate{

  constructor(private loginService:LoginService,private router:Router){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log('in normal guard')
      if(this.loginService.isLogin()&&this.loginService.getUserRole()==='NORMAL'){
          return true;
      }
      this.router.navigate(['login'])

    return false;
  }

  // normalGuard:CanActivateFn=(route,state)=>{
  //   if(this.loginService.getUserRole()==='NORAMAL'){
  //     return true;
  //   }
  //   this.router.navigate(['login'])
  //   return false;
  // }
}
