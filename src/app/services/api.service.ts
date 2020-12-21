import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private log: LoggerService) {}

  getGeoJson(): Observable<GeoJSON.FeatureCollection> {
    const res = this.http.get<GeoJSON.FeatureCollection>('assets/data.json');
    res.subscribe((p) => this.log.message('Geojson loaded', p));
    return res;
  }
}
