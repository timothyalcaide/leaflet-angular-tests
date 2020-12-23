import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { filteredObjectByKeys } from 'src/app/utils/shared.utils';

@Component({
  selector: 'app-popup-content',
  templateUrl: './popup-content.component.html',
  styleUrls: ['./popup-content.component.scss'],
})
export class PopupContentComponent implements OnInit {
  @Input() feature: GeoJSON.Feature;
  @Output() add = new EventEmitter<GeoJSON.Feature>();
  properties: any[];

  ngOnInit(): void {
    this.properties = Object.entries(
      filteredObjectByKeys(
        this.feature.properties,
        this.feature.properties.popupContent
      )
    );
  }

  onClick(): void {
    this.add.emit(this.feature);
    console.log('TODO: add feature t the propertit list tab');
  }
}
