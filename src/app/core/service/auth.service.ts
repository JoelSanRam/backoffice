import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FirebaseService } from './firebase/firebase.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private dataSource = new BehaviorSubject(false);
  currentData = this.dataSource.asObservable();

  private dataSourcemobile = new BehaviorSubject(false);
  currentDatamobile = this.dataSourcemobile.asObservable();

  public currentUserSubject: BehaviorSubject<any>;
  private user = new BehaviorSubject<any>(null);
  // get user (){ return this.currentUser}
  public currentUser:any;
  public token = '';


  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FirebaseService
    ) {
      this.currentUserSubject = new BehaviorSubject<any>(
        JSON.parse(localStorage.getItem('currentUser'))
      );
      if (this.currentUserSubject.value !== null) {
        this.token = this.currentUserSubject.value.token;
        this.currentUser = this.currentUserSubject.value;
      }
     }

  login(data){
    return this.http.post<any>(`${environment.apiUrl}login`, data).pipe(map(user => {
          if (user && user.token != null) {            
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('access_token', user.token);
            localStorage.setItem('access_user', user.userData.idUser);
            // localStorage.setItem('access_agen', user.userData.idAgencia);
            localStorage.setItem('access_ope', user.userData.idOperador);
            localStorage.setItem('user_data', JSON.stringify(user.userData));
            this.token = user.token;
            this.currentUserSubject.next(user['token']);
            this.fb.loginFirebase();
          }
          return user;
        }, (err) => {
          console.log(err)
          alert(err.message);
        })
      );
  }

  //?Esto debemos hacerlo singleton porque se accede muchas veces
	getUser(id: any) {
		return this.http.get<any>(`${environment.apiUrl}user/${id}`).pipe(map(response => {
      this.user.next(response)
			return this.user.value;
		}));
	}

  logout(){
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('access_token');
    localStorage.removeItem('access_user');
    // localStorage.removeItem('access_agen', user.userData.idAgencia);
    localStorage.removeItem('access_ope');
    localStorage.removeItem('user_data');
    this.router.navigate(['/login']);
  }

  changeData(data: any) {
    this.dataSource.next(data);
  }

  changeDataMobile(data: any) {
    this.dataSourcemobile.next(data);
  }
}
