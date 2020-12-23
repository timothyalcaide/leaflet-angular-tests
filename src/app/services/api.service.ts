import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  BaseLayer,
  Campaign,
  ID,
  MapSmall,
  Overlay,
} from '../model/shared.model';
import { filteredObjectByKeys } from '../utils/shared.utils';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private log: LoggerService) {}

  getCampaignList(): Observable<Campaign[]> {
    const res = this.http
      .get<Campaign[]>('assets/campaigns.json')
      .pipe(map((campaigns) => Object.values(campaigns)));
    res.subscribe((p) => this.log.message('Campaign list loaded', p));
    return res;
  }

  getCampaign(id: string): Observable<Campaign> {
    const res = this.http
      .get<Campaign[]>('assets/campaigns.json')
      .pipe(map((campaigns) => campaigns[id]));
    res.subscribe((p) => this.log.message('Campaign is loaded by id', p));
    return res;
  }

  getMapSmall(id: string): Observable<MapSmall> {
    const res = this.http
      .get<MapSmall[]>('assets/maps.json')
      .pipe(map((maps) => maps[id]));
    res.subscribe((p) => this.log.message('Map is loaded by Id', p));
    return res;
  }

  getOverlays(ids: ID[]): Observable<Overlay[]> {
    const res = this.http
      .get<Overlay[]>('assets/overlays.json')
      .pipe(
        map(
          (overlays) =>
            Object.values(filteredObjectByKeys(overlays, ids)) as Overlay[]
        )
      );
    res.subscribe((p) => this.log.message('Overlays is loaded by Ids', p));
    return res;
  }

  getBaselayers(ids: ID[]): Observable<BaseLayer[]> {
    const res = this.http
      .get<BaseLayer[]>('assets/base-layers.json')
      .pipe(
        map(
          (layers) =>
            Object.values(filteredObjectByKeys(layers, ids)) as BaseLayer[]
        )
      );
    res.subscribe((p) => this.log.message('Baselayer is loaded by Ids', p));
    return res;
  }

  // getMap(mapId: ID): Observable<Map> {
  //   const res = this.http.get<MapSmall[]>('assets/maps.json').pipe(
  //     map((maps) => maps.find((m) => m.id === mapId)),
  //     mergeMap((currentMap: MapSmall) => {
  //       const { id, baseLayerIds, overlayIds, config } = currentMap;
  //       const baselayers = this.getBaselayers(baseLayerIds);
  //       const overlays = this.getOverlays(overlayIds);
  //       return {
  //         id,
  //         config,
  //         baselayers,
  //         overlays,
  //       };
  //     })
  //   );
  //   res.subscribe((p) => this.log.message('Map is loaded by Id', p));
  //   return res;
  // }
}
