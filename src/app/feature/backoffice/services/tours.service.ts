import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  constructor(private http: HttpClient) { }

  autocomplete($txt, $ts, $types) {
    let params;
    const ts = $ts !== '' ? 'ts=' + $ts : '';
    const types = $types !== '' ? 'types=' + $types : '';
    if (ts) {
      params = ts + '&' + types;
    } else {
      params = types;
    }
    return this.http
      .get<any>(`${environment.apiUrl}autocomplete/${$txt}?${params}`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  searchTours(data) {
    // console
    const pd = data.d || data.D || '';
    const ps = data.s || data.S || '';
    const ocupacion = '&ocupacion=' + data.ocupacion;
    const adultos = '&adultos=' + data.adultos;
    const menores = '&menores=' + data.menores;
    const d = pd != '' ? '&d=' + encodeURI(pd) : '';
    const s = ps != '' ? '&s=' + encodeURI(ps) : '';
    const dt = '&dt=' + data.dt;
    const ts = '&ts=' + data.ts;
    const urlParams = d + s + dt + ts + ocupacion + adultos + menores;
    return this.http
      .get<any>(`${environment.apiUrl}availability/tours?${urlParams}`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  filtersNameTours(data) {
    return this.http
      .post<any>(`${environment.apiUrl}availability/tours/filtros`, data)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  getTourDetails(data) {
    console.log(data)
    return this.http.get<any>(`${environment.apiUrl}page/${data}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getTourGallery(data) {
    return this.http.get<any>(`${environment.apiUrl}page/${data}/gallery`).pipe(
        map((response) => {
            return response;
        })
    );
  }

}
