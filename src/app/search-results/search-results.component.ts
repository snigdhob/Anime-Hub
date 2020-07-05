import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultsList } from 'src/model/searchResults';
import { JikanService } from '../jikan.service';
import { BaseComponent } from '../BaseComponent';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent extends BaseComponent implements OnInit {

  actualQueryString: string;
  encodedQueryString: string;
  searchResults: Array<ResultsList> = [];
  pageNumber: number = 1;
  lastPage: number = 0;
  sortMain: Sort;
  sortedData: ResultsList[] = [];

  constructor(private route: ActivatedRoute, private animeService: JikanService) {
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.actualQueryString = routeParams.queryString.replace(/-/g, ' ');
      this.encodedQueryString = encodeURIComponent(this.actualQueryString);
      this.pageNumber = 1;
      this.getSearchResults();
    });
  }

  getSearchResults(orderBy: string = '', sort: string = '') {
    this.showSpinner("searchResultsSpinner");
    this.animeService.search(this.encodedQueryString, this.pageNumber, undefined, orderBy, sort).subscribe(
      res => {
        this.sortedData = res.results;
        if (this.pageNumber === 1) {
          this.lastPage = res.last_page;
        }
        this.hideSpinner("searchResultsSpinner");
      },
      error => {
        this.hideSpinner("searchResultsSpinner");
        console.log(error);
      })
  }

  pageChanged(currentPage: number, bottom: boolean = false) {
    this.pageNumber = currentPage;
    this.showSpinner("searchResultsSpinner");
    if (!this.sortMain || !this.sortMain.active || this.sortMain.direction === '') {
      this.getSearchResults();
    }
    else {
      this.getSearchResults(this.sortMain.active, this.sortMain.direction);
    }
    if (bottom) {
      const element = document.querySelector('h3');
      element.scrollIntoView();
    }
  }

  sortData(sort: Sort) {
    this.sortMain = sort;
    this.pageNumber = 1;
    if (!sort.active || sort.direction === '') {
      this.getSearchResults();
    }
    else {
      this.getSearchResults(sort.active, sort.direction);
    }
  }

}
