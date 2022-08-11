import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CircuitoService {

  constructor(
    private http: HttpClient
  ) { }

  autocomplete($txt, $ts, $types) {
    let params;
    const ts = $ts !== '' ? 'ts=' + $ts : '';
    const types = $types !== '' ? 'types=' + $types : '';
    if (ts) {
      params = ts + '&' + types;
    } else {
      params = types;
    }
    return this.http.get<any>(`${environment.apiUrl}autocomplete/${$txt}?${params}`).pipe(map((response) => {
      return response;
    })
    );
  }

  searchCircuitos(data) {
    const pd = data.d || data.D || '';
    const ps = data.s || data.S || '';
    const ts = '&ts=' + data.ts;
    const d = pd != '' ? '&d=' + encodeURI(pd) : '';
    const s = ps != '' ? '&s=' + encodeURI(ps) : '';
    const dt = '&dt=' + data.dt;
    const nhabs = '&nhabs=' + data.nhabs; // NUMERO DE HABITACIONES
    const habs = '&habs=' + JSON.stringify(data.habs); // ROOMING
    const matchs = '&matchs=' + data.matchs;
    const urlParams = ts + d + s + dt + nhabs + habs + matchs;
    return this.http.get<any>(`${environment.apiUrl}availability/circuitos?${urlParams}`).pipe(map((response) => {
      return response;
    })
    );
  }

  getCircuitoDetails(data) {
    return this.http.get<any>(`${environment.apiUrl}page/${data}`).pipe(map((response) => {
        return response;
      })
    );
  }

  getServiceGallery(data) {
    return this.http.get<any>(`${environment.apiUrl}page/${data}/gallery`).pipe(map((response) => {
          return response;
        })
      );
  }

}
