import {
  Component,
  OnInit
} from '@angular/core';

import { AppState, FmaSong } from '../app.service';
import {MdSnackBar, MdDialog} from '@angular/material';
import { HomeDialogComponent } from "./home-dialog.component"
import * as _ from 'lodash';

@Component({
  selector: 'home',
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  // Set our default values
  public fma_data = {};
  genres = [];
  artists = [];


  constructor(
    public appState: AppState,
    public snackBar: MdSnackBar,
    public dialog: MdDialog
  ) {}

  public ngOnInit() {
    System.import('../../data/fma_small/fma_small_custom.json')
      .then((json) => {
        console.log('fma_data', json);
        this.appState.setFMA(json);

        this.genres = _.uniq(
          _.map(json, (song: FmaSong) => {
            return song.top_genre;
          })
        );

        this.artists = _.uniq(
          _.map(json, (song: FmaSong) => {
            return song.artist;
          })
        );
      });
  }

  public tabIndexChange(index: number){
    this.appState.setIndex(index);
  }

  public getObjectKeys(object): any[] {
    return Object.keys(object);
  }

  public launchSnackBar(): void {
    const sb = this.snackBar.open("hello", "OK!", {duration: 3000});
    sb.onAction().subscribe(
      () => {
        const dialog = this.dialog.open(HomeDialogComponent, {width:"500px", height:"300px"});
        dialog.afterClosed().subscribe(
          () => console.log("dialog was closed")
        )
      },
      () => console.log("it failed!!")
    )
  }
}
