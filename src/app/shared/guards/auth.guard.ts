import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(
  private authService: AuthService,
  private router: Router
  ){}

  canActivate(){
    const currentUser = this.authService.currentUser;
    
    if (currentUser) {
     
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  
}
