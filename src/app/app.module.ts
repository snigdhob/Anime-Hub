import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopAnimesComponent } from './top-animes/top-animes.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponentComponent } from './spinner-component/spinner-component.component';
import { ProcessIndicatorComponent } from './process-indicator/process-indicator.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AnimeComponent } from './anime/anime.component';
import { CardComponent } from './card/card.component';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [    
    AppComponent,
    TopAnimesComponent,
    SpinnerComponentComponent,
    ProcessIndicatorComponent,
    SearchResultsComponent,
    AnimeComponent,
    CardComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule, 
    MatProgressSpinnerModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
