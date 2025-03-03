import { Component } from '@angular/core';
declare var jQuery: any;
declare var handleMagnificPopup: any;

@Component({
    selector: 'app-content11',
    imports: [],
    templateUrl: './content11.component.html',
    styleUrl: './content11.component.css'
})
export class Content11Component {
  ngOnInit(): void {
    (function ($) {
      handleMagnificPopup();
    })(jQuery);
  }
}
