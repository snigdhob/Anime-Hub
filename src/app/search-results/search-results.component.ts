import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IAnimeData } from "src/model/searchResults";
import { JikanService } from "../common/services/jikan.service";
import { BaseComponent } from "../common/BaseComponent";
import { Sort } from "@angular/material/sort";

@Component({
  selector: "app-search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.scss"],
})
export class SearchResultsComponent extends BaseComponent implements OnInit {
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

  constructor(
    private route: ActivatedRoute,
    private animeService: JikanService
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe((routeParams) => {
      this.actualQueryString = routeParams.queryString.replace(/-/g, " ");
      this.encodedQueryString = encodeURIComponent(this.actualQueryString);
      this.getSearchResults("popularity");
    });
  }

  getSearchResults(orderBy: string = "", sort: string = "") {
    this.showSpinner("searchResultsSpinner");
    this.animeService
      .search(
        this.encodedQueryString,
        this.pageNumber,
        undefined,
        orderBy,
        sort
      )
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
    } else {
      this.getSearchResults(sort.active, sort.direction);
    }
  }
}
