import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import {
  circle,
  control,
  geoJSON,
  LatLng,
  Layer,
  layerGroup,
  Map,
  MapOptions,
} from 'leaflet';
import { PopupContentComponent } from './../popup-content/popup-content.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnChanges {
  @Input() layers: GeoJSON.FeatureCollection[];
  @Input() baseLayers: { [name: string]: Layer }[];
  @Input() options: MapOptions;
  @Input() control: any;
  @Output() selected = new EventEmitter<GeoJSON.Feature>();
  featureSelected: GeoJSON.Feature;
  map: Map;

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  onMapReady(map: Map): void {
    this.map = map;
  }

  ngOnChanges(): void {
    if (this.map && this.layers) {
      this.loadLayers(this.layers);
    }
  }

  // TODO create interface overlays (geojson feature collection with metadata (id and name) )
  private loadLayers(layers: any): void {
    let overlays = {};

    layers.map((layer) => {
      const group = layerGroup();
      overlays = { ...overlays, [layer.name]: group };
      return this.map.addLayer(group.addLayer(this.generateLayerGroup(layer)));
    });

    control.layers(this.baseLayers as any, overlays).addTo(this.map);
  }

  private generateLayerGroup(layer: any): any {
    let geojson: any;

    const onSelectFeature = (e: any) => {
      const { lat, lng } = e.latlng;
      this.map.panTo([lat, lng]);
      this.featureSelected = e.sourceTarget.feature;
      this.selected.emit(e.sourceTarget.feature);
    };

    const highlightFeature = (e) => {
      e.target.setStyle({
        weight: 8,
        fillColor: '#FF000',
        color: '#666',
        fillOpacity: 0.6,
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

    const onEachFeature = (feature: GeoJSON.Feature, l: Layer) => {
      l.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: onSelectFeature,
      });

      if (feature.properties.popupContent) {
        const factory = this.resolver.resolveComponentFactory(
          PopupContentComponent
        );
        const component = factory.create(this.injector);
        component.instance.feature = feature;
        component.changeDetectorRef.detectChanges();
        const popupContent = component.location.nativeElement;
        l.bindPopup(popupContent, { offset: [0, -10] });
      }
    };

    const style = (feature: GeoJSON.Feature) => {
      if (feature.properties.style) {
        return feature.properties.style;
      } else {
        // Load default style
        const type = feature.geometry.type;
        // TODO : set default style
        switch (type) {
          case 'Point':
          case 'MultiPoint':
            break;
          case 'LineString':
          case 'MultiLineString':
            return {
              color: '#ff7800',
              weight: 5,
              opacity: 0.65,
              lineCap: 'round',
              lineJoin: 'round',
            };
            break;
          case 'Polygon':
          case 'MultiPolygon':
            break;
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

    geojson = geoJSON(layer, {
      onEachFeature,
      pointToLayer,
      style,
      filter,
    });

    return geojson;
  }
}
