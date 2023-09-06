import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { IAnimeListResponse } from "../../../model/searchResults";
import { IAnime } from "../../../model/anime";

@Injectable({
  providedIn: "root",
})
export class JikanService {
  private readonly url: string = "https://api.jikan.moe/v4/";
  constructor(private http: HttpClient) {}

  getTopAnimes(
    pageNumber: number,
    category: string
  ): Observable<IAnimeListResponse> {
    let queryString = `page=${pageNumber}&sfw`;
    if (category) {
      queryString += `&filter=${category}`;
    }

    return this.http
      .get<IAnimeListResponse>(`${this.url}top/anime?${queryString}`)
      .pipe(catchError(this.handleError));
  }

  search(
    queryString: string,
    pageNumber: number,
    limit: number = undefined,
    orderBy: string = "",
    sort: string = ""
  ): Observable<IAnimeListResponse> {
    const mainEndpoint = "anime?sfw&";
    let q: string;
    if (queryString.length == 1) {
      q = `letter=${queryString}`;
    } else {
      q = `q=${queryString}`;
    }
    const pageString = `page=${pageNumber}`;
    let finalUrl: string = `${this.url}${mainEndpoint}${q}&${pageString}`;
    if (limit) {
      finalUrl += `&limit=${limit}`;
    }
    if (orderBy) {
      finalUrl += `&order_by=${orderBy}`;
    }
    if(sort){
      finalUrl += `&sort=${sort}`
    }
    return this.http
      .get<IAnimeListResponse>(finalUrl)
      .pipe(catchError(this.handleError));
  }

  getAnime(id: number): Observable<IAnime> {
    return this.http
      .get<IAnime>(`${this.url}anime/${id}/full`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    let errorMessage: string = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
