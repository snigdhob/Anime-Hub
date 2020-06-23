import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Anime Search Engine';
  queryString: string = '';
  letterList: string[] = [];
  searchWarningShow: boolean = false;

  constructor(protected router: Router) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.initializeSearchResults();
  }

  showMessage() {

  }

  onSearch() {
    if (this.queryString.length >= 3) {
      let modifiedQueryString = this.queryString.split(/\s+/).join('-');
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

  onFocusSearchBox(){
    if(this.queryString.length < 3){
      this.searchWarningShow = true;
    }
    else{
      this.searchWarningShow = false;
    }
  }

  onFocusOutSearchBox(){
    this.searchWarningShow = false;
  }

}
