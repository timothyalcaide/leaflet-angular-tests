import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { MapComponent } from './components/map/map.component';
import { CampaignComponent } from './containers/campaign/campaign.component';
import { MaterialModule } from './material.module';
import { PopupContentComponent } from './components/popup-content/popup-content.component';

@NgModule({
  declarations: [AppComponent, MapComponent, CampaignComponent, PopupContentComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LeafletModule,
    LeafletDrawModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
