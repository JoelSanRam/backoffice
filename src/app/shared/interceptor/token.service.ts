import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/service/auth.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  lang;
  constructor(
    public authService: AuthService,
  ) { 
      // console.log('tokinterceptoren', this.authService.token)
   }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentToken = localStorage.getItem('access_token');
    if (!currentToken) {
      return next.handle(req);
    }
    const cloneReq = req.clone({
      headers: req.headers.set('Token', `Bearer ${currentToken}`).set('Lang', ` ${this.lang}`),
    });
    return next.handle(cloneReq);
  }
}