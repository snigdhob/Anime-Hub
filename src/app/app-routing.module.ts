import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopAnimesComponent } from './top-animes/top-animes.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { AnimeComponent } from './anime/anime.component';

const routes: Routes = [
  { path: 'home', component: TopAnimesComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'search/:queryString', component: SearchResultsComponent },
  { path: 'anime/:id/:name/:needsScroll', component: AnimeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
