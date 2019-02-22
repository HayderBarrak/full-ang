import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxDatatableCaseRoutingModule } from './ngx-datatable-case-routing.module';
import {NgxDatatableCaseComponent} from "./ngx-datatable-case.component";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import { RowDetailComponent } from './row-detail/row-detail.component';
import { PagedTableComponent } from './paged-table/paged-table.component';
import { SharedModule } from '@app/shared/shared.module';
import {ReactiveFormsModule} from "@angular/forms";




@NgModule({
  imports: [
    CommonModule,
    NgxDatatableCaseRoutingModule,
    NgxDatatableModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [NgxDatatableCaseComponent, RowDetailComponent, PagedTableComponent]
})
export class NgxDatatableCaseModule { }
