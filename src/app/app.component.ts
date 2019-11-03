import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <app-chat></app-chat>
  `
})

export class AppComponent {
  constructor() {}
}
