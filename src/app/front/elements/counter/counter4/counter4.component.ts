import { Component } from '@angular/core';
declare var jQuery: any;

@Component({
    selector: 'app-counter4',
    imports: [],
    templateUrl: './counter4.component.html',
    styleUrl: './counter4.component.css'
})
export class Counter4Component {
  constructor() { }

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
