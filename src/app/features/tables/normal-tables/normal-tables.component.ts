import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PlatformModel} from "@app/core/services/Platforms/platform.model";
import {FormBuilder} from "@angular/forms";
import {platformService} from "@app/core/services/Platforms/Platform.service";
import {Router} from "@angular/router";

@Component({
  selector: 'sa-normal-tables',
  templateUrl: './normal-tables.component.html',

})
export class NormalTablesComponent implements OnInit {
  ngOnInit() {
  }

}
