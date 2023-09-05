import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JikanService } from './jikan.service';
import { IAnimeData } from 'src/model/searchResults';
import { BaseComponent } from './BaseComponent';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {
  title = 'Anime Search Engine';
  queryString: FormControl;
  letterList: string[] = [];
  searchWarningShow: boolean = false;
  smartSearchResults: IAnimeData[] = [];
  timeoutId: any;
  searchDone: boolean = false;

  constructor(protected router: Router, private animeService: JikanService) {
    super();
    this.queryString = new FormControl('');
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.initializeSearchResults();
  }

  onSearch(event: any = undefined) {
    if (this.queryString.value.length >= 3) {
      let modifiedQueryString = this.queryString.value.split(/\s+/).join('-');      
      if(event){
        event.target.blur();
      }
      this.smartSearchResults = [];
      this.router.navigate(['search', modifiedQueryString]);
    }
  }

  initializeSearchResults() {
    for (let i = 65; i <= 90; i++) {
      this.letterList.push(String.fromCharCode(i));
    }
  }

  navigateFromLetterClick(letter: string) {
    this.router.navigate(['search', letter]);
  }

  onFocusSearchBox = (isKeyup: boolean = false) => {
    if (this.queryString.value.length < 3) {
      this.searchWarningShow = true;
      this.smartSearchResults = [];
    }
    else {
      this.searchWarningShow = false;
      const debouncedFunc = this.debounce(this.getSearchResults, 500);
      debouncedFunc();
    }
  }

  onFocusOutSearchBox() {
    this.searchWarningShow = false;
  }

  getSearchResults = () => {
    this.searchDone = false;
    this.smartSearchResults = [];
    this.animeService.search(this.queryString.value, 1, 5).subscribe(
      res => {
        this.smartSearchResults = res.data;
        this.searchDone = true;
      },
      error => {
        console.log(error);
      })
  }

  debounce = (fn, delay: number) => {
    return (...args) => {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this.timeoutId = setTimeout(() => {
        fn(...args);
        this.timeoutId = null;
      }, delay);
    }
  }

  navigateSmartSearch(item: any) {
    if (typeof (item) === 'string') {
      this.onSearch();
    }
    else {
      this.queryString.setValue(String(item.title));
      setTimeout(() => {
        this.router.navigate(['/anime', item.mal_id, item.title, 'n']);
      }, 500);
    }
  }

}
