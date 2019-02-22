import {Component, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import * as fromLayout from '@app/core/store/layout';
import { Store } from '@ngrx/store';

@Component({
  selector: 'sa-minify-menu',
  template: `<span class="minifyme" (click)="toggle()">
   <i class="fa fa-arrow-circle-left hit"></i>
</span>`,
})
export class MinifyMenuComponent {

  private isminified = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}



  toggle() {
    //this.store.dispatch(new fromLayout.MinifyMenu())
    if(this.isminified){
      this.document.body.classList.remove('minified');
      this.isminified=false;
    }else{
      this.document.body.classList.add('minified');
      this.isminified=true;
    }

  }
}