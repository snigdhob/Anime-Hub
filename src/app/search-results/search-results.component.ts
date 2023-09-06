import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IAnimeData } from "src/model/searchResults";
import { JikanService } from "../common/services/jikan.service";
import { BaseComponent } from "../common/BaseComponent";
import { Sort } from "@angular/material/sort";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.scss"],
})
export class SearchResultsComponent extends BaseComponent implements OnInit, OnDestroy {
  actualQueryString: string;
  encodedQueryString: string;
  searchResults: IAnimeData[] = [];
  pageNumber: number = 1;
  lastPage: number = 0;
  totalResults: number = 0;
  sortMain: Sort;
  sortedData: IAnimeData[] = [];
  @ViewChild("searchResultsHeader")
  searchResultsHeader: ElementRef<HTMLElement>;
  notifier = new Subject();

  constructor(
    private _route: ActivatedRoute,
    private _animeService: JikanService
  ) {
    super();
  }

  ngOnInit(): void {
    this._route.params
    .pipe(takeUntil(this.notifier))
    .subscribe((routeParams) => {
      this.actualQueryString = routeParams.queryString.replace(/-/g, " ");
      this.encodedQueryString = encodeURIComponent(this.actualQueryString);
      this.getSearchResults("popularity");
    });
  }

  getSearchResults(orderBy: string = "", sort: string = "") {
    this.showSpinner("searchResultsSpinner");
    this._animeService
      .search(
        this.encodedQueryString,
        this.pageNumber,
        undefined,
        orderBy,
        sort
      )
      .pipe(takeUntil(this.notifier))
      .subscribe(
        (res) => {
          this.sortedData = res.data;
          if (this.pageNumber === 1) {
            this.lastPage = res.pagination.last_visible_page;
            this.totalResults = res.pagination.items.total;
          }
          this.hideSpinner("searchResultsSpinner");
        },
        (error) => {
          this.hideSpinner("searchResultsSpinner");
          console.log(error);
        }
      );
  }

  pageChanged(currentPage: number, bottom: boolean = false) {
    this.pageNumber = currentPage;
    this.showSpinner("searchResultsSpinner");
    if (
      !this.sortMain ||
      !this.sortMain.active ||
      this.sortMain.direction === ""
    ) {
      this.getSearchResults();
    } else {
      this.getSearchResults(this.sortMain.active, this.sortMain.direction);
    }
    if (bottom) {
      this.searchResultsHeader.nativeElement.scrollIntoView();
    }
  }

  sortData(sort: Sort) {
    this.sortMain = sort;
    this.pageNumber = 1;
    if (!sort.active || sort.direction === "") {
      this.getSearchResults("popularity");
    } else if (sort.active === "type") {
      const isAsc = sort.direction === "asc";
      this.sortedData = this.sortedData.sort((a, b) => {
        return compare(a.type, b.type, isAsc);
      });
    } else {
      this.getSearchResults(sort.active, sort.direction);
    }
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}

function compare(a: string, b: string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
