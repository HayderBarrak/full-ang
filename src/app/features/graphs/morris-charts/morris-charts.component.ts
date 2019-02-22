import {Component, OnInit} from '@angular/core';
import { JsonApiService } from '@app/core/services';

@Component({
  selector: 'sa-morris-charts',
  templateUrl: './morris-charts.component.html',
})
export class MorrisChartsComponent implements OnInit {

  public morrisDemoData:any;

  constructor(private jsonApiService:JsonApiService) {
  }

  ngOnInit() {

  }

}
