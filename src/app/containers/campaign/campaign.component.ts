import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

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

  mapboxBase = tileLayer(
    `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${environment.mapbox.api}`,
    {
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      maxZoom: 20,
    }
  );

  options = {
    layers: [this.mapboxBase],
    zoom: 14,
    center: latLng(43.621537577864906, 3.8771438598632812),
  };

  baseLayers = {
    Mapbox: this.mapboxBase,
    'Open Street Map': tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
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
