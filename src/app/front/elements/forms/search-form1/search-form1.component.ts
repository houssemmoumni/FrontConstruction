import { Component } from '@angular/core';
declare var jQuery: any;
declare var handleBootstrapSelect: any;

@Component({
    selector: 'app-search-form1',
    imports: [],
    templateUrl: './search-form1.component.html',
    styleUrl: './search-form1.component.css'
})
export class SearchForm1Component {

  ngOnInit(): void {
    setTimeout(() => {
      (function ($) {
        handleBootstrapSelect();
      })(jQuery);
    }, 1000)
  }
}
