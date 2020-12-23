import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CampaignResolver,
  MapSmallResolver,
} from './resolvers/campaign.resolvers';
import { CampaignDetailComponent } from './containers/campaign-detail/campaign-detail.component';
import { CampaignListComponent } from './containers/campaign-list/campaign-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'campaign',
    pathMatch: 'full',
  },
  {
    path: 'campaign',
    component: CampaignListComponent,
  },
  {
    path: 'campaign/:id',
    component: CampaignDetailComponent,
    resolve: { campaign: CampaignResolver, mapSmall: MapSmallResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
