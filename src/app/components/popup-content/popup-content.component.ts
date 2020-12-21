import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
      this.filteredObjectByKeys(this.feature.properties)
    );
  }

  onClick(): void {
    this.add.emit(this.feature);
    console.log('TODO: add feature t the propertit list tab');
  }

  private filteredObjectByKeys(raw: any): any {
    const allowed = raw.popupContent;
    const filtered = Object.keys(raw)
      .filter((key) => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = raw[key];
        return obj;
      }, {});
    return filtered;
  }
}
