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
import { NgxPaginationModule } from 'ngx-pagination';
import { AnimeComponent } from './anime/anime.component';
import { CardComponent } from './card/card.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatSortModule} from '@angular/material/sort';
import { SafePipe } from './common/pipes/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TopAnimesComponent,
    SpinnerComponentComponent,
    ProcessIndicatorComponent,
    SearchResultsComponent,
    AnimeComponent,
    CardComponent,
    SafePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgxPaginationModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
    MatIconModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
