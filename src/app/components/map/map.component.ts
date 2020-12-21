import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { circle, geoJSON, LatLng, Layer, Map, MapOptions } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnChanges {
  @Input() data: GeoJSON.FeatureCollection;
  @Input() options: MapOptions;
  @Output() selected = new EventEmitter<GeoJSON.Feature>();
  featureSelected: GeoJSON.Feature;
  layers = [];
  map: Map;

  // TODO : add bind popup with properties (add a component dynamiquely)

  onMapReady(map: Map): void {
    this.map = map;
  }

  ngOnChanges(): void {
    if (this.map) {
      this.loadLayers();
    }
  }

  private loadLayers(): void {
    let geojson: any;

    const onSelectFeature = (e: any) => {
      const { lat, lng } = e.latlng;
      this.map.panTo([lat, lng]);
      this.featureSelected = e.sourceTarget.feature;
      this.selected.emit(e.sourceTarget.feature);
    };

    const highlightFeature = (e) => {
      const layer = e.target;
      layer.setStyle({
        weight: 5,
        color: '#666',
        fillOpacity: 0.7,
      });
    };

    const resetHighlight = (e) => {
      geojson.resetStyle(e.target);
    };

    const pointToLayer = (feature: GeoJSON.Feature, latlng: LatLng) => {
      const featureSyle = feature.properties.style;
      if (featureSyle) {
        return circle(latlng, {
          radius: 10,
          fillColor: featureSyle.fillColor,
          color: featureSyle.color,
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
        });
      } else {
        return circle(latlng, {
          radius: 10,
          fillColor: 'red',
          color: '#888',
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
        });
      }
    };

    const onEachFeature = (feature: GeoJSON.Feature, layer: Layer) => {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: onSelectFeature,
      });
    };

    const style = (feature: GeoJSON.Feature) => {
      if (feature.properties.style) {
        return feature.properties.style;
      } else {
        // Load default style
        // TODO switch(type).. for default style all geometries
        const type = feature.geometry.type;

        if (type === 'LineString') {
          return {
            color: '#ff7800',
            weight: 5,
            opacity: 0.65,
          };
        }
      }
    };

    const filter = (feature: GeoJSON.Feature): boolean => {
      const showOnMap = feature.properties.visible;
      if (showOnMap === false) {
        return false;
      } else {
        // true and undefined
        return true;
      }
    };

    geojson = geoJSON(this.data, {
      onEachFeature,
      pointToLayer,
      style,
      filter,
    });

    this.map.addLayer(geojson);
  }
}
