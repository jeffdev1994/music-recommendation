import {Component} from '@angular/core';

@Component({
  selector: 'home-dialog',
  template: `
    <h2 md-dialog-title>This is a dialog</h2>
    <md-dialog-content>
      some stuff in here
    </md-dialog-content>
`
})
export class HomeDialogComponent {}
