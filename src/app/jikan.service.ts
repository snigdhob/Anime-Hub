import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { TopAnimes } from 'src/model/top-animes';
import { SearchResult } from 'src/model/searchResults';
import { Anime } from 'src/model/anime';

@Injectable({
  providedIn: 'root'
})
export class JikanService {
  private readonly url: string = 'https://api.jikan.moe/v3/';
  constructor(private http: HttpClient) { }

  getTopAnimes(pageNumber: number, category: string): Observable<TopAnimes> {
    return this.http.get<TopAnimes>(`${this.url}top/anime/${pageNumber}/${category}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  search(queryString: string, pageNumber: number): Observable<SearchResult> {
    const mainEndpoint = 'search/anime?';
    let q: string;
    if (queryString.length == 1) {
      q = `letter=${queryString}`;
    }
    else {
      q = `q=${queryString}`;
    }
    const pageString = `page=${pageNumber}`;
    let finalUrl: string = `${this.url}${mainEndpoint}${q}&${pageString}`;
    return this.http.get<SearchResult>(finalUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAnime(id: number): Observable<Anime> {
    return this.http.get<Anime>(`${this.url}anime/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    }
    else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
