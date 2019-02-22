import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {platformService} from "@app/core/services/Platforms/Platform.service";
import {PlatformModel} from "@app/core/services/Platforms/platform.model";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {DataTablePagerComponent} from "@swimlane/ngx-datatable";

@Component({
  selector: 'row-detail-demo',
  templateUrl: './row-detail.component.html',
    styleUrls: ['./row-detail-ngx-datatable.css']

})
export class RowDetailComponent implements OnInit {
   // rowes = [];
    selected = [];
    temp = [];
  @ViewChild('myTable') table: any;
  platform: PlatformModel;
  rows: PlatformModel[] = [];
    isSaving: boolean;
  timeout: any;
  page: string;
  row: string;
  sidx: string;
  sortd: string;

    controls: any = {
        pageSize:  10,
        filter: '',

    }
 constructor(private formBuilder: FormBuilder,
     private platService: platformService,
             private router: Router,
  ) {

  }

  ngOnInit() {
      this.isSaving = false;

      this.selected = [];
      this.platform = new PlatformModel();
      this.platService.queryPlatforms().subscribe(data=> {
      this.rows = data;
    })
  }





  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }



    toggleExpandRow(row) {
        this.platform = new PlatformModel();
        this.platform=row;
        row.$$expanded=!row.$$expanded;
        console.log('Toggled Expand Row!', row);
        this.table.rowDetail.toggleExpandRow(row);
    }

    toggleExpandNewRow() {
        this.platform = new PlatformModel();

        this.table.rowDetail.toggleExpandRow(this.platform);
    }



  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.rows.filter(function(d) {
            return !val || ['nom', 'adresse', 'login'].some((field: any)=>{
                return d[field].toLowerCase().indexOf(val) !== -1
            })
        });

        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }


    @Input()  public options = {
        mode: 'inline',
        disabled: false,
        inline: true
    };

    onChange(){
        this.options.mode = this.options.inline ? 'inline' : 'popup'
    }

    private onSaveSuccess(result) {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    previousState() {
        window.history.back();
    }

    onSelect({ selected }) {
        console.log('Select Event', selected, this.selected);

        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }

    updatePageSize(value) {

        if(!this.controls.filter){
            // update the rows
            this.rows = [...this.temp];
            // Whenever the filter changes, always go back to the first page
            this.table.offset = 0;
        }

        this.controls.pageSize = parseInt(value)

        this.table.limit = this.controls.pageSize;

        window.dispatchEvent(new Event('resize'));

    }


    Delete(){
        for (let i of this.selected){
        this.platService.delete(i.id).subscribe(value => console.log('deleted'));
        this.rows.splice(this.rows.indexOf(i),1);

        }

    }


    add(){
       const row = new PlatformModel();
       row.$$expanded = false ;
        this.rows = [...this.rows, row];
        this. toggleExpandRow(row);
    }


    save(){
        console.log("works")
        this.isSaving = true;
        if(this.platform.id === null){
            this.platService.create(this.platform).subscribe(response => this.onSaveSuccess(response),() => this.onSaveError());
        }
        else {
            this.platService.update(this.platform).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
        }
        this.router.navigate(['ngx-datatable'])
    }

    @Input() cssClasses: any = {
        sortAscending: 'fa fa-sort-up',
        sortDescending: 'fa fa-sort-down',
        pagerLeftArrow: 'fa  fa-angle-left',
        pagerRightArrow: 'fa fa-angle-right',
        pagerPrevious: 'fa fa-angle-double-left',
        pagerNext: 'fa fa-angle-double-right'
    };

}
