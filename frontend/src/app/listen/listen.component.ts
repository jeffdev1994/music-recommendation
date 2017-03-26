import {Component, OnInit, Input} from '@angular/core';
import { AppState, FmaSong } from '../app.service';
import * as _ from 'lodash';
import * as numeral from 'numeral';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'listen',
  styleUrls: [
    './listen.component.css'
  ],
  templateUrl: './listen.component.html'
})
export class ListenComponent implements OnInit {
  audio = new Audio();
  currentTime = 0;

  currentSong = "-1";

  constructor(
    public appState: AppState
  ) {}

  ngOnInit(): void {
    Observable.timer(500,50).subscribe(t => this.currentTime = this.audio.currentTime);
  }

  private getRandomSong(): any {
    const filteredByGenre = this.appState.getGenreAndArtistSongs();

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
      // TODO: may need to start some loading here, depending on how long recommending takes
      this.appState.recommendSongs();
      this.appState.setIndex(3);
    }
    else {
      this.start();
    }
  }

  public dislike(): void {
    this.appState.dislikeSong(this.currentSong);
    this.start();
  }

  public numberToTimeString(number: number): string {
    return numeral(number).format('00:00:00');
  }

  public seek(event: any): void {
    this.audio.currentTime = event.value;
  }

}
