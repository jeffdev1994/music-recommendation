import {Component, OnInit, Input} from '@angular/core';
import { AppState, FmaSong } from '../app.service';
import * as _ from 'lodash';

@Component({
  selector: 'genre',
  styleUrls: [
    './genre.component.css'
  ],
  templateUrl: './genre.component.html'
})
export class GenreComponent implements OnInit {
  @Input() genres: string[] = [];

  constructor(
    public appState: AppState
  ) {}

  ngOnInit(): void {
  }

  public selectGenre(genre: string): void {
    this.appState.setGenre(genre);
    this.appState.resetLikedSongs();
    this.appState.setIndex(1);
  }
}
