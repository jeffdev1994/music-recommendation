import { Injectable } from '@angular/core';
import * as _ from "lodash";

export type InternalStateType = {
  [key: string]: any
};

export type FmaData = {
  [key: string]: FmaSong;
}

export interface FmaSong {
  album_name: string;
  artist: string;
  artist_familiarity: number;
  genres: string[];
  title: string;
  top_genre: string;
}

@Injectable()
export class AppState {

  fma: FmaData = {};
  selectedGenre: string = "";
  selectedArtists: string[] = [];
  selectedIndex = 0;
  likedSongs: FmaSong[] = [];

  public setGenre(genre: string){
    this.selectedGenre = genre;
  }

  public setFMA(fma: FmaData){
    this.fma = fma;
  }

  public setIndex(index){
    this.selectedIndex = index;
  }

  public likeSong(index){
    this.likedSongs.push(this.fma[index]);
  }

  public resetLikedSongs(){
    this.likedSongs = [];
  }

  public selectArtist(artist: string){
    this.selectedArtists = _.xor(this.selectedArtists, [artist])
  }

}
