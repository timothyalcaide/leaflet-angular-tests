import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Campaign, ID } from '../model/shared.model';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private log: LoggerService) {}

  getLayers(): Observable<GeoJSON.FeatureCollection[]> {
    const res = this.http.get<GeoJSON.FeatureCollection[]>(
      'assets/layers.json'
    );
    res.subscribe((p) => this.log.message('Layers loaded', p));
    return res;
  }

  getCampaignList(): Observable<Campaign[]> {
    const res = this.http.get<Campaign[]>('assets/campaigns.json');
    res.subscribe((p) => this.log.message('Campaign loaded', p));
    return res;
  }

  getCampaign(id: ID): Observable<Campaign> {
    const res = this.http.get<Campaign>('assets/campaigns.json');
    res.subscribe((p) => this.log.message('Campaign id loaded', p));
    return res.pipe(filter((camp) => camp.id === id));
  }
}
