import { Component } from '@angular/core';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
declare  var jQuery:  any;
@Component({
    selector: 'app-contact-us1',
    imports: [
        HeaderLight3Component,
        Footer13Component
    ],
    templateUrl: './contact-us1.component.html',
    styleUrl: './contact-us1.component.css'
})
export class ContactUs1Component {
email1 = 'info@example.com';
email2 = 'hr@example.com';
email3 = 'support@example.com';
ngOnInit(): void {
  (function ($) {
    jQuery('select').selectpicker();

  })(jQuery);
}
scroll_top() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}
}
