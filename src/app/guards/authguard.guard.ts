import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  token1:any
  token2:any
  constructor(  private router: Router){
    
  }
  canActivate(): Observable<any> | Promise<any> | any {
    this.token1=localStorage.getItem('login_token');
    // this.token2=localStorage.getItem('signtoken');
    console.log(this.token1);
    
    if (this.token1) {
      console.log("bhag");
      
      return true;
    } else {
      const tree: UrlTree = this.router.parseUrl('/login');
      console.log("hat");
      
      return tree;
    }
  }
  
}
