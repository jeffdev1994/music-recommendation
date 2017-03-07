import {Component, OnInit, Input} from '@angular/core';
import { AppState, FmaSong } from '../app.service';
import * as _ from 'lodash';

@Component({
  selector: 'listen',
  styleUrls: [
    './listen.component.css'
  ],
  templateUrl: './listen.component.html'
})
export class ListenComponent implements OnInit {
  audio = new Audio();
  currentSong = "-1";

  constructor(
    public appState: AppState
  ) {}

  ngOnInit(): void {
  }

  private getRandomSong(): any {
    const filteredByGenre = _.omitBy(this.appState.fma, (song: FmaSong) => {
      return song.top_genre !== this.appState.selectedGenre;
    });

    const keys = Object.keys(filteredByGenre);
    const i = Math.floor(Math.random() * keys.length);

    return keys[i];
  }

  public start(): void {
    const id = this.getRandomSong();
    this.currentSong = id;
    this.audio.load();
    this.audio.src = `../../data/fma_small/${this.appState.selectedGenre}/${id}.mp3`;
    this.audio.play();
  }

  public pause(): void{
    this.audio.pause();
  }

  public resume(): void{
    this.audio.play();
  }

  public check(): void {
    this.appState.likeSong(this.currentSong);
    if (this.appState.likedSongs.length >= 5){
      this.pause();
      this.appState.setIndex(2);
    }
    else {
      this.start();
    }
  }

}
