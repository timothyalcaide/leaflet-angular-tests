import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { circle, geoJSON, LatLng, Layer, layerGroup, Map } from 'leaflet';
import 'leaflet.smoothwheelzoom';
import { setDefaultStyleOfFeature } from 'src/app/utils';
import { Overlay } from '../../model/shared.model';
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
  @Output() selected = new EventEmitter<GeoJSON.Feature>();
  featureSelected: GeoJSON.Feature;
  map: Map;
  layers: Layer[];

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  onMapReady(map: Map): void {
    this.map = map;
  }

  ngOnChanges(): void {
    if (this.map && this.overlays && this.baseLayers) {
      this.layers = this.loadOverlaysAndAddControl(this.overlays);
    }
  }

  onUpdateConfigMap(): Partial<Config> {
    const center = this.map.getCenter();
    const zoom = this.map.getZoom();
    // TODO Add it to the store and merge with initial config to get that config after navigation
    console.log({ zoom, center });
    return { zoom, center };
  }

  private loadOverlaysAndAddControl(os: Overlay[]): Layer[] {
    let overlays = {};

    os.map((layer) => {
      const group = layerGroup();
      overlays = { ...overlays, [layer.name]: group };
      return group.addLayer(this.generateLayerGroup(layer));
    });

    return Object.values(overlays);
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
      const featureSyle = e.target.feature.properties.style;
      if (featureSyle && Object.keys(featureSyle).includes('radius')) {
        e.target.setStyle({
          radius: featureSyle.radius * 1.2,
          fillColor: featureSyle.fillColor,
          color: featureSyle.color,
          fillOpacity: featureSyle.opacity * 0.5,
        });
      } else if (featureSyle) {
        e.target.setStyle({
          weight: featureSyle.weight * 2,
          fillColor: featureSyle.fillColor,
          color: featureSyle.color,
          fillOpacity: featureSyle.opacity * 0.5,
        });
      } else {
        return;
      }
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
        l.bindPopup(popupContent, {
          offset: [0, -10],
          maxHeight: 200,
          autoPan: false,
        });
      }
    };

    const style = (feature: GeoJSON.Feature) => {
      if (feature.properties.style) {
        return feature.properties.style;
      } else {
        // Load default style
        const type = feature.geometry.type;
        setDefaultStyleOfFeature(type);
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
