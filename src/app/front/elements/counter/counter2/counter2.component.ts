import { Component } from '@angular/core';
declare  var jQuery:  any;

@Component({
    selector: 'app-counter2',
    imports: [],
    templateUrl: './counter2.component.html',
    styleUrl: './counter2.component.css'
})
export class Counter2Component {
  ngOnInit(): void {
    setTimeout(() => {
      (function ($) {
        jQuery('.counter').counterUp({
          delay: 10,
          time: 3000
        });
      })(jQuery);
    }, 100)
	}
}
