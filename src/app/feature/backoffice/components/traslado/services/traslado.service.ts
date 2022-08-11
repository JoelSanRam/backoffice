import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrasladoService {
  private destinosSubject = new BehaviorSubject<any>("");

  constructor(private http: HttpClient) {
   }

  getDestinosTraslado(){
    if(this.destinosSubject.value===""){
      return this.http.get<any>(`${environment.apiUrl}busquedaDestinos/tra`).pipe(map(result => {
        this.destinosSubject.next(result);
        return result;
      }));
    }else{
      return this.destinosSubject.asObservable();
    }
  }

  getTrasladosAvailables(data){
    return this.http.post<any>(`${environment.apiUrl}availability/traslados`, data).pipe(map(result => {
      return result;
    }));
  }

  getZones(idDestino){
    return this.http.get<any>(`${environment.apiUrl}traslado/zonas/`+idDestino).pipe(map(result => {
      return result;
    }));
  }
}
