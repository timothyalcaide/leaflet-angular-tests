import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss'],
})
export class CampaignComponent implements OnInit {
  geojson$: Observable<GeoJSON.FeatureCollection>;
  selectedFeature: GeoJSON.Feature;

  // TODO : get the basemap config with url
  // campagn/1  => map/1
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }),
    ],
    zoom: 14,
    center: latLng(43.621537577864906, 3.8771438598632812),
  };

  constructor(private service: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.geojson$ = this.service.getGeoJson();
  }

  onFeature(feature: GeoJSON.Feature): void {
    this.selectedFeature = feature;
    this.cdr.detectChanges();
  }
}
