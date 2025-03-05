import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-comment-form1',
    imports: [],
    templateUrl: './comment-form1.component.html',
    styleUrl: './comment-form1.component.css'
})
export class CommentForm1Component {
  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }
}
