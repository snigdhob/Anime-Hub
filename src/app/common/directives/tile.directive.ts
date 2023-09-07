import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  OnDestroy,
} from "@angular/core";
import { Router } from "@angular/router";
import { Subject, fromEvent } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Directive({
  selector: "[appTile]",
})
export class TileDirective implements OnDestroy {
  @Input() appTile: ITile = null;
  isMobile = true;
  resizeObservable$ = fromEvent(window, "resize");
  notifier = new Subject();

  constructor(
    private _router: Router,
    private _el: ElementRef,
    private _renderer: Renderer2
  ) {
    this.isMobile = window.outerWidth < 768;
    this.resizeObservable$.pipe(takeUntil(this.notifier)).subscribe((event) => {
      const w = event.target as Window;
      this.isMobile = this.checkIsMobile(w.outerWidth);
    });
    this.checkIsMobile(window.outerWidth);
  }

  @HostListener("click") onMouseEnter() {
    if (this.isMobile) {
      this._renderer.setStyle(
        this._el.nativeElement,
        "background-color",
        "dimgrey"
      );
      setTimeout(() => {
        this._router.navigate([
          this.appTile.url,
          this.appTile.id,
          this.appTile.title,
        ]);
      }, 60);
    }
  }

  checkIsMobile(width: number): boolean {
    return width < 768;
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}

interface ITile {
  url: string;
  id: string;
  title: string;
}
