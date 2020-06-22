import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../BaseComponent';
import { JikanService } from '../jikan.service';
import { Anime } from 'src/model/anime';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.scss']
})
export class AnimeComponent extends BaseComponent implements OnInit {

  id: number;
  animeDetails: Anime;
  noneFoundMsg: string;
  producers: string = '';
  licensors: string = '';
  noGenreMsg: string;
  genres: string = '';
  studios: string = '';
  isRelatedEmpty: boolean = true;

  constructor(private route: ActivatedRoute, private animeService: JikanService) {
    super();
    this.noneFoundMsg = 'None found';
    this.noGenreMsg = 'No genres have been added yet.';
  }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.id = routeParams.id;
      // if(routeParams.needsScroll === 'y'){
      window.scroll(0, 0);
      // }
      this.getAnimeDetails(this.id);
    });
  }

  getAnimeDetails(id: number) {
    this.showSpinner('animeSpinner');
    this.animeService.getAnime(id).subscribe(
      res => {
        this.animeDetails = res;
        this.setProducers();
        this.setLicensors();
        this.setGenres();
        this.setStudios();
        this.existsRelatedObj();
        this.hideSpinner('animeSpinner');
      },
      error => {
        console.log(error);
      })
  }

  setProducers() {
    if (this.animeDetails.producers.length > 0) {
      for (let i = 0; i < this.animeDetails.producers.length - 1; i++) {
        this.producers += `${this.animeDetails.producers[i].name}, `;
      }
      this.producers += this.animeDetails.producers[this.animeDetails.producers.length - 1].name;
    }
    else {
      this.producers = this.noneFoundMsg;
    }
  }

  setLicensors() {
    if (this.animeDetails.licensors.length > 0) {
      for (let i = 0; i < this.animeDetails.licensors.length - 1; i++) {
        this.licensors += `${this.animeDetails.licensors[i].name}, `;
      }
      this.licensors += this.animeDetails.licensors[this.animeDetails.licensors.length - 1].name;
    }
    else {
      this.licensors = this.noneFoundMsg;
    }
  }

  setGenres() {
    if (this.animeDetails.genres.length > 0) {
      for (let i = 0; i < this.animeDetails.genres.length - 1; i++) {
        this.genres += `${this.animeDetails.genres[i].name}, `;
      }
      this.genres += this.animeDetails.genres[this.animeDetails.genres.length - 1].name;
    }
    else {
      this.genres = this.noGenreMsg;
    }
  }

  setStudios() {
    if (this.animeDetails.studios.length > 0) {
      for (let i = 0; i < this.animeDetails.studios.length - 1; i++) {
        this.studios += `${this.animeDetails.studios[i].name}, `;
      }
      this.studios += this.animeDetails.licensors[this.animeDetails.studios.length - 1].name;
    }
    else {
      this.studios = this.noneFoundMsg;
    }
  }

  existsRelatedObj() {
    this.isRelatedEmpty = Object.keys(this.animeDetails.related).length === 0
      && this.animeDetails.related.constructor === Object;
  }

}
