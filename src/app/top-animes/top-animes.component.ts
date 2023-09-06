import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { JikanService } from "../common/services/jikan.service";
import { IAnimeData } from "src/model/searchResults";
import { FormControl } from "@angular/forms";
import { BaseComponent } from "../BaseComponent";
import { map, mergeMap, tap } from "rxjs/operators";

@Component({
  selector: "app-top-animes",
  templateUrl: "./top-animes.component.html",
  styleUrls: ["./top-animes.component.scss"],
})
export class TopAnimesComponent extends BaseComponent implements OnInit {
  category: FormControl;
  topAnimesResult: IAnimeData[] = [];
  lastSelectedCategory: string = "";
  selectedPageNumber: number = 1;
  hasNextPage = true;
  @ViewChild("topAnimesHeader") topAnimesHeader: ElementRef<HTMLElement>;

  constructor(private animeService: JikanService) {
    super();
  }

  ngOnInit(): void {
    this.category = new FormControl("favorite");
    this.onClickCategory("favorite");
  }

  onClickCategory(category: string) {
    if (category !== this.lastSelectedCategory) {
      this.category.setValue(category);
      this.lastSelectedCategory = category;
      this.selectedPageNumber = 1;
      this.showSpinner("topAnimesSpinner");
      this.getTopAnimes(category);
    }
  }

  onClickButton(buttonName: string) {
    if (buttonName === "prev25") {
      this.selectedPageNumber -= 1;
    } else {
      this.selectedPageNumber += 1;
    }
    this.showProcessInd(buttonName);
    this.topAnimesHeader.nativeElement.scrollIntoView();
    this.getTopAnimes(this.category.value, this.selectedPageNumber, buttonName);
  }

  getTopAnimes(
    category: string,
    pageNumber: number = 1,
    buttonPressed = undefined
  ) {
    this.animeService
      .getTopAnimes(pageNumber, category)
      .pipe(
        tap((res) => (this.hasNextPage = res.pagination.has_next_page)),
        map((res) => res.data),
        map((data) =>
          data.map((item, i) => {
            item.computedRank = i + 1 + 25 * (this.selectedPageNumber - 1);
            return item;
          })
        )
      )
      .subscribe(
        (res) => {
          this.topAnimesResult = res;
          this.hideCurrentSpinner(buttonPressed);
        },
        (error) => {
          console.log(error);
          this.hideCurrentSpinner(buttonPressed);
        }
      );
  }

  hideCurrentSpinner(buttonPressed = undefined) {
    if (!buttonPressed) {
      this.hideSpinner("topAnimesSpinner");
    } else {
      this.hideProcessInd(buttonPressed);
    }
  }
}
