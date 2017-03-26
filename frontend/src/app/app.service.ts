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
  unselectedArtists: string[] = [];
  selectedIndex = 0;
  likedSongs: FmaSong[] = [];
  dislikedSongs: FmaSong[] = [];
  recommendedSongs: FmaData = {};

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

  public dislikeSong(index){
    this.dislikedSongs.push(this.fma[index]);
  }

  public resetLikedSongs(){
    this.likedSongs = [];
  }

  public resetUnselectedArtists() {
    this.unselectedArtists = [];
  }

  public unselectArtist(artist: string){
    this.unselectedArtists = _.xor(this.unselectedArtists, [artist])
  }

  public getSelectedGenreSongs(): FmaSong[]{
    return _.omitBy(this.fma, (song: FmaSong) => {
      return song.top_genre !== this.selectedGenre;
    }) as FmaSong[];
  }

  public getGenreAndArtistSongs(): FmaSong[] {
    return _.omitBy(this.getSelectedGenreSongs(), (song: FmaSong) => {
      return _.indexOf(this.unselectedArtists, song.artist) !== -1 ;
    }) as FmaSong[];
  }

  public recommendSongs(): void {
    //just recommend first 5 songs here, will be replaced with actual recommendations
    const recommendedSongs = {};
    let i = 0;
    _.map(Object.keys(this.fma), (key: any) => {
      if(i < 5){
        recommendedSongs[key] = this.fma[key];
        i++;
      }
    });

    this.recommendedSongs = recommendedSongs
  }
}
