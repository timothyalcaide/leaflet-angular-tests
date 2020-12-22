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
  layers$: Observable<GeoJSON.FeatureCollection[]>;
  propertiesList: any[];
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

  baseLayers = {
    'Open Street Map': tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { maxZoom: 19 }
    ),
    'Open Cycle Map': tileLayer(
      'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
      { maxZoom: 19 }
    ),
  };

  constructor(private service: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.layers$ = this.service.getLayers();
    this.propertiesList = [];
  }

  onFeature(feature: GeoJSON.Feature): void {
    this.selectedFeature = feature;
    // TODO add to feature list if click button tooltip
    this.propertiesList = [...this.propertiesList, feature];
    this.cdr.detectChanges();
  }
}
