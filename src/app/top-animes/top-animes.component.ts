import { Component, OnInit } from '@angular/core';
import { JikanService } from '../jikan.service';
import { TopEntity } from 'src/model/top-animes';
import { FormControl } from '@angular/forms';
import { BaseComponent } from '../BaseComponent';

@Component({
  selector: 'app-top-animes',
  templateUrl: './top-animes.component.html',
  styleUrls: ['./top-animes.component.scss']
})
export class TopAnimesComponent extends BaseComponent implements OnInit {

  category: FormControl;
  topAnimesResult: TopEntity[] = [];
  lastSelectedCategory: string = '';
  selectedPageNumber: number = 1;

  constructor(private animeService: JikanService) {
    super();
    this.category = new FormControl('favorite');
  }

  ngOnInit(): void {
    this.onClickCategory('favorite');
  }

  onClickCategory(category: string) {
    if (category !== this.lastSelectedCategory) {
      this.category.setValue(category);
      this.lastSelectedCategory = category;
      this.selectedPageNumber = 1;
      this.showSpinner('topAnimesSpinner');
      this.getTopAnimes(category);
    }
  }

  onClickButton(buttonName: string) {
    if (buttonName === 'prev50') {
      this.selectedPageNumber -= 1;
    }
    else {
      this.selectedPageNumber += 1;
    }
    this.showProcessInd(buttonName);
    const scrollTo = document.querySelector('h3');
    scrollTo.scrollIntoView();
    this.getTopAnimes(this.category.value, this.selectedPageNumber, buttonName);
  }

  getTopAnimes(category: string, pageNumber: number = 1, buttonPressed = undefined) {
    this.animeService.getTopAnimes(pageNumber, category).subscribe(
      res => {
        this.topAnimesResult = res.top;
        this.hideCurrentSpinner(buttonPressed);
      },
      error => {
        console.log(error);
        this.hideCurrentSpinner(buttonPressed);
      })
  }

  hideCurrentSpinner(buttonPressed = undefined) {
    if (!buttonPressed) {
      this.hideSpinner('topAnimesSpinner');
    }
    else {
      this.hideProcessInd(buttonPressed);
    }
  }
}


