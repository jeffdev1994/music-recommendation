import {Component, OnInit, Input} from '@angular/core';
import { AppState, FmaSong } from '../app.service';
import * as _ from 'lodash';

@Component({
  selector: 'artists',
  styleUrls: [
    'artists.component.css'
  ],
  templateUrl: 'artists.component.html'
})
export class ArtistsComponent implements OnInit {

  constructor(
    public appState: AppState
  ) {}

  ngOnInit(): void {
  }

  public getGenreArtists(): string[] {
    return _.uniq(
      _.map(this.appState.getSelectedGenreSongs(), (song: FmaSong) => song.artist)
    ).sort();
  }

  public selectArtist(artist: string): void {
    console.log(artist);
    this.appState.unselectArtist(artist);
  }

  public next(): void {
    this.appState.setIndex(2);
  }
}
