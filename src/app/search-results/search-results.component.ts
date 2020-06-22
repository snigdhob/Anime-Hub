import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultsList } from 'src/model/searchResults';
import { JikanService } from '../jikan.service';
import { BaseComponent } from '../BaseComponent';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent extends BaseComponent implements OnInit, AfterViewInit {

  actualQueryString: string;
  encodedQueryString: string;
  searchResults: Array<ResultsList> = [];
  pageNumber: number = 1;
  lastPage: number = 0;

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

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.showSpinner("searchResultsSpinner");
  }

  getSearchResults() {
    this.showSpinner("searchResultsSpinner");
    this.animeService.search(this.encodedQueryString, this.pageNumber).subscribe(
      res => {
        this.searchResults = res.results;
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
    this.getSearchResults();
    if (bottom) {
      const element = document.querySelector('h3');
      element.scrollIntoView();
    }
  }

}
