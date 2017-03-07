import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class Title {

  public value = 'Angular 2';

  constructor(
    public http: Http
  ) {}

  public getData() {

    return this.http.get('../../data/fma_small/fma_small.json').map(res => res.json());
  }

}
