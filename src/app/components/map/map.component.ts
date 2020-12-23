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
} from 'leaflet';
import { Overlay } from '../../model/shared.model';
import { setSectionColor } from '../../utils/';
import { BaseLayer, Config } from './../../model/shared.model';
import { PopupContentComponent } from './../popup-content/popup-content.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnChanges {
  @Input() overlays: Overlay[];
  @Input() baseLayers: BaseLayer[];
  @Input() config: Config;
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
    if (this.map && this.overlays && this.baseLayers) {
      this.loadOverlaysAndAddControl(this.overlays);
    }
  }

  private loadOverlaysAndAddControl(os: Overlay[]): void {
    let overlays = {};

    os.map((layer) => {
      const group = layerGroup();
      overlays = { ...overlays, [layer.name]: group };
      return this.map.addLayer(group.addLayer(this.generateLayerGroup(layer)));
    });

    // console.log(convertBaselayersForLeafletControl(this.baseLayers));

    control.layers(null, overlays).addTo(this.map);
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
        const prop = feature.properties;
        // TODO : set default style
        switch (type) {
          case 'Point':
          case 'MultiPoint':
            break;
          case 'LineString':
            if (prop.type === 'SECTION') {
              return setSectionColor(prop.stateNote);
            }
            break;
          case 'MultiLineString':
            return {
              color: '#ff7800',
              weight: 5,
              opacity: 0.65,
              lineCap: 'round',
              lineJoin: 'round',
            };
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
