import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { MapComponent } from './components/map/map.component';
import { PopupContentComponent } from './components/popup-content/popup-content.component';
import { CampaignDetailComponent } from './containers/campaign-detail/campaign-detail.component';
import { CampaignListComponent } from './containers/campaign-list/campaign-list.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    CampaignDetailComponent,
    PopupContentComponent,
    CampaignListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
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
