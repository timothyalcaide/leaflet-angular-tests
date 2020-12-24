import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import {
  BaseLayer,
  Campaign,
  Config,
  MapSmall,
  Overlay,
} from '../../model/shared.model';
import { convertConfigToLeaflet } from '../../utils/leaflet.utils';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.scss'],
})
export class CampaignDetailComponent implements OnInit {
  overlays$: Observable<Overlay[]>;
  baselayers$: Observable<BaseLayer[]>;
  selectedFeature: GeoJSON.Feature;
  campaign: Campaign;
  mapSmall: MapSmall;
  config: Config;
  canAddFeature = true;

  /////
  featureList: any[];

  constructor(
    private service: ApiService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.featureList = [];
    this.campaign = this.route.snapshot.data.campaign;
    this.mapSmall = this.route.snapshot.data.mapSmall;
    const conf = convertConfigToLeaflet(this.mapSmall.config);

    // add params for smooth zoom
    this.config = {
      ...conf,
      scrollWheelZoom: false,
      smoothWheelZoom: true,
      smoothSensitivity: 2,
    };

    this.overlays$ = this.service.getOverlays(this.mapSmall.overlayIds);
    this.baselayers$ = this.service.getBaselayers(this.mapSmall.baseLayerIds);
  }

  featureSelected(feature: GeoJSON.Feature): void {
    this.selectedFeature = feature;
    this.canAddFeature = true;
    this.cdr.detectChanges();
  }

  onAddFeature(feature: GeoJSON.Feature): void {
    if (this.canAddFeature) {
      this.featureList.push(feature);
      this.canAddFeature = false;
      this.cdr.detectChanges();
    }
  }

  onClearFeatureList(): void {
    this.featureList = [];
    this.cdr.detectChanges();
  }
}
