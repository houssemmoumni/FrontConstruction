import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
declare var jQuery: any;
declare var handleMagnificPopup: any;

@Component({
    selector: 'app-content9',
    imports: [RouterLink],
    templateUrl: './content9.component.html',
    styleUrl: './content9.component.css'
})
export class Content9Component {
  ngOnInit(): void {
    (function ($) {
      handleMagnificPopup();
    })(jQuery);
  }
}
