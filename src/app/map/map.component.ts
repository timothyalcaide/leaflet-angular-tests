import { Component, OnInit } from '@angular/core';
import { geoJSON, latLng, tileLayer } from 'leaflet';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  geoJson$: Observable<GeoJSON.FeatureCollection>;
  layers = [];

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }),
    ],
    zoom: 14,
    center: latLng(43.621537577864906, 3.8771438598632812),
  };

  constructor(private service: ApiService) {}

  ngOnInit(): void {
    this.service.getGeoJson().subscribe((res) => {
      res.features.map((feature) => {
        this.layers.push(geoJSON(feature));
      });
    });
  }

}
