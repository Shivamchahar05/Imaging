import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginguardGuard implements CanActivate {
  token1:any
  constructor( private _router:Router){}
  canActivate(): boolean | UrlTree {
    this.token1=localStorage.getItem('refresh_token');
    if (this.token1) {
      console.log(this.token1);
      const tree: UrlTree = this._router.parseUrl('layout');
      return tree;
    } else {
      return true;
    }
  }
  
}
