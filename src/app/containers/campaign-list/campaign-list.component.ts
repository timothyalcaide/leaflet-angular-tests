import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Campaign } from 'src/app/model/shared.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss'],
})
export class CampaignListComponent implements OnInit {
  campaignlist$: Observable<Campaign[]>;

  constructor(private service: ApiService) {}

  ngOnInit(): void {
    this.campaignlist$ = this.service.getCampaignList();
  }
}
