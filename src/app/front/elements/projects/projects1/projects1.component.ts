import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
declare  var jQuery:  any;
declare  var handleMasonryFilter2:  any;

@Component({
    selector: 'app-projects1',
    imports: [RouterLink],
    templateUrl: './projects1.component.html',
    styleUrl: './projects1.component.css'
})
export class Projects1Component {
  ngOnInit(): void {
    (function ($) {
        handleMasonryFilter2();
    })(jQuery);
}

}
