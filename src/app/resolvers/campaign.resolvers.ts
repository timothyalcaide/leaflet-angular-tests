import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Campaign, MapSmall } from 'src/app/model/shared.model';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class MapSmallResolver implements Resolve<MapSmall> {
  constructor(private service: ApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    const id = route.params.id;
    return this.service.getCampaign(id).pipe(
      switchMap((campaign) => {
        return this.service.getMapSmall(campaign.mapId);
      }),
      catchError((err) => {
        console.log('Error: ', err);
        return this.router.navigate(['..']);
      })
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class CampaignResolver implements Resolve<Campaign> {
  constructor(private service: ApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    const id = route.params.id;

    return this.service.getCampaign(id).pipe(
      catchError((err) => {
        console.log('Error: ', err);
        return this.router.navigate(['..']);
      })
    );
  }
}
