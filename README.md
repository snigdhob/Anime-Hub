# Anime Hub

![snigdhob github io_Anime-Hub_search_F](https://github.com/snigdhob/Anime-Hub/assets/20543966/d5491130-e941-4e35-abf1-6ad4b72db4f2) 

![snigdhob github io_Anime-Hub_search_F(iPhone XR)](https://github.com/snigdhob/Anime-Hub/assets/20543966/4167f60e-30e0-4a78-8930-3b3a78463725)

This codebase was created to demonstrate a fully fledged [anime](https://en.wikipedia.org/wiki/Anime) search engine application built with Angular 9. It uses the public [Jikan API](https://jikan.moe/) for all requests which is modelled on the immensely popular anime and manga social networking and social cataloging website, [MyAnimeList](https://myanimelist.net/).

## Get started

### Prerequisites

- Install [Git](https://git-scm.com/).
- Install [Node.js](https://nodejs.org/) which includes [Node Package Manager](https://www.npmjs.com/get-npm).
- Install the [Angular CLI](https://github.com/angular/angular-cli) globally.

### Clone the repo

```
git clone https://github.com/snigdhob/Anime-Hub.git
cd Anime-Hub
```

### Install npm packages

Install the `npm packages` described in the `package.json` file:

```
npm install
```

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Building the project

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Functionality overview

This application is an anime search engine called "Anime Hub". It uses a free API for all requests. cross-viewport responsiveness for all screens has been ensured. You can view a live demo over at [https://snigdhob.github.io/Anime-Hub](https://snigdhob.github.io/Anime-Hub)

### General functionality

- Display paginated list of top animes filtered by *favorties* or *popularity*.
- Typeahead search feature to search for animes by name. It utilises debouncing to control request frequency and reduce unnecessary requests.
- Display paginated list of animes by alphabet or by name.
- List can be sorted by *title*, *type*, *episodes* or *score*.
- Display dedicated anime description page for complete details about any anime.

## Changelog

- September 5, 2023
  - Jikan API upgrade from [v3](https://docs.google.com/document/d/172RQ9wWiXqOnGqjXrV3cxMNceiqwCjxjprSFuyLwQJM/edit?usp=sharing) to [v4](https://docs.api.jikan.moe/)

