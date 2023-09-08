import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "../common/BaseComponent";
import { JikanService } from "../common/services/jikan.service";
import { IData } from "src/model/anime";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-anime",
  templateUrl: "./anime.component.html",
  styleUrls: ["./anime.component.scss"],
})
export class AnimeComponent extends BaseComponent implements OnInit, OnDestroy {
  id: number;
  animeDetails: IData;
  noneFoundMsg = `None found`;
  producers: string = "";
  licensors: string = "";
  noGenreMsg = `No genres have been added yet`;
  genres: string = "";
  studios: string = "";
  notifier = new Subject();
  backgroundErrorMsg = `No background information has been added to this title.`;
  informationErrorMsg = `No information available.`;

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
        this.id = routeParams.id;
        window.scroll(0, 0);
        this.getAnimeDetails(this.id);
      });
  }

  getAnimeDetails(id: number) {
    this.showSpinner("animeSpinner");
    this._animeService
      .getAnime(id)
      .pipe(takeUntil(this.notifier))
      .subscribe(
        (res) => {
          this.animeDetails = res.data;
          this.setProducers();
          this.setLicensors();
          this.setGenres();
          this.setStudios();
          this.hideSpinner("animeSpinner");
        },
        (error) => {
          console.log(error);
        }
      );
  }

  setProducers() {
    this.producers = "";
    if (this.animeDetails.producers.length > 0) {
      for (let i = 0; i < this.animeDetails.producers.length - 1; i++) {
        this.producers += `${this.animeDetails.producers[i].name}, `;
      }
      this.producers +=
        this.animeDetails.producers[
          this.animeDetails.producers.length - 1
        ].name;
    } else {
      this.producers = this.noneFoundMsg;
    }
  }

  setLicensors() {
    this.licensors = "";
    if (this.animeDetails.licensors.length > 0) {
      for (let i = 0; i < this.animeDetails.licensors.length - 1; i++) {
        this.licensors += `${this.animeDetails.licensors[i].name}, `;
      }
      this.licensors +=
        this.animeDetails.licensors[
          this.animeDetails.licensors.length - 1
        ].name;
    } else {
      this.licensors = this.noneFoundMsg;
    }
  }

  setGenres() {
    this.genres = "";
    if (this.animeDetails.genres.length > 0) {
      for (let i = 0; i < this.animeDetails.genres.length - 1; i++) {
        this.genres += `${this.animeDetails.genres[i].name}, `;
      }
      this.genres +=
        this.animeDetails.genres[this.animeDetails.genres.length - 1].name;
    } else {
      this.genres = this.noGenreMsg;
    }
  }

  setStudios() {
    this.studios = "";
    if (this.animeDetails.studios.length > 0) {
      for (let i = 0; i < this.animeDetails.studios.length - 1; i++) {
        this.studios += `${this.animeDetails.studios[i].name}, `;
      }
      this.studios +=
        this.animeDetails.studios[this.animeDetails.studios.length - 1].name;
    } else {
      this.studios = this.noneFoundMsg;
    }
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
