import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Gif, SearchResponse} from "../interfaces/gifs.interface";

const GIPHY_API_KEY: string = '2ouhiWyIQ3JF2hFv64saIpHjNgTXbVVm';
const GIPHY_API_URL: string = 'https://api.giphy.com/v1/gifs';
const GIPHY_API_LIMIT: string = '10';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _tagsHistory: string[] = [];
  gifList: Gif[] = [];

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  searchTag(tag: string): void {
    if (!tag.length) return

    this.organizeHistory(tag);

    const params: HttpParams = new HttpParams()
      .set('api_key', GIPHY_API_KEY)
      .set('q', tag)
      .set('limit', GIPHY_API_LIMIT)

    this.http.get<SearchResponse>(`${GIPHY_API_URL}/search`, {params})
      .subscribe(resp => this.gifList = resp.data);
  }

  private organizeHistory(tag: string): void {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag))
      this._tagsHistory = this._tagsHistory.filter(tagHistory => tagHistory !== tag);

    this._tagsHistory.unshift(tag);

    this._tagsHistory = this._tagsHistory.slice(0, 10);

    this.saveLocalStorage()
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage() {
    if (!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if (!this._tagsHistory.length) return;

    this.searchTag(this.tagsHistory[0])
  }
}
