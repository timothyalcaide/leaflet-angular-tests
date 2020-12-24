import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { filteredObjectByKeys } from 'src/app/utils/shared.utils';

@Component({
  selector: 'app-popup-content',
  templateUrl: './popup-content.component.html',
  styleUrls: ['./popup-content.component.scss'],
})
export class PopupContentComponent implements OnInit, OnDestroy {
  @Input() feature: GeoJSON.Feature;
  @Output() add = new EventEmitter<GeoJSON.Feature>();
  @Output() clearSelected = new EventEmitter<void>();
  properties: any[];

  ngOnInit(): void {
    this.properties = Object.entries(
      filteredObjectByKeys(
        this.feature.properties,
        this.feature.properties.popupContent
      )
    );
  }

  ngOnDestroy(): void {
    this.clearSelected.emit();
    // TODO add this to the store and empty the selected layer
  }
}
