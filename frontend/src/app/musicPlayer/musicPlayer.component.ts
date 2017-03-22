import {Component, OnInit, Input} from '@angular/core';
import { AppState, FmaSong } from '../app.service';
import * as _ from 'lodash';
import * as numeral from 'numeral';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'musicPlayer',
  styleUrls: [
    'musicPlayer.component.css'
  ],
  templateUrl: 'musicPlayer.component.html'
})
export class MusicPlayerComponent implements OnInit {
  @Input() song: FmaSong;
  @Input() songId: number;
  audio = new Audio();
  currentTime = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.load();
    Observable.timer(500,50).subscribe(t => this.currentTime = this.audio.currentTime);
  }

  public load(): void {
    this.audio.load();
    this.audio.src = `../../data/fma_small/${this.song.top_genre}/${this.songId}.mp3`;
  }

  public pause(): void{
    this.audio.pause();
  }

  public resume(): void{
    this.audio.play();
  }

  public numberToTimeString(number: number): string {
    return numeral(number).format('00:00:00');
  }

  public seek(event: any): void {
    this.audio.currentTime = event.value;
  }

}
