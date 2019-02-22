import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarouselModule} from "ngx-bootstrap";
import { SmartadminLayoutModule } from '@app/shared/layout';
import { SmartadminWidgetsModule } from '@app/shared/widgets/smartadmin-widgets.module';
import { StatsModule } from '@app/shared/stats/stats.module';
import { SmartadminDatatableModule } from '@app/shared/ui/datatable/smartadmin-datatable.module';

@NgModule({
  imports: [
    CommonModule,



    SmartadminLayoutModule,
    SmartadminWidgetsModule,
    StatsModule,
    SmartadminDatatableModule,
    CarouselModule,

  ],
  declarations: [

  ]
})
export class ECommerceModule { }
