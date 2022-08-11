import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MicroblogService {

  constructor(
    private http: HttpClient
  ) { }
  getPublicaciones() {
    return this.http.get<any>(`${environment.apiRest}public/microblogs`).pipe(map(result => {
      return result;
    }));
  }

  getPublicacion(idBlog) {
    return this.http.get<any>(`${environment.apiRest}public/microblogs/${idBlog}`).pipe(map(result => {
      return result;
    }));
  }
}
