import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer){}

  transform(url: string, ...args: unknown[]): SafeResourceUrl {
      return this._sanitizer.bypassSecurityTrustResourceUrl(url);    
  }

}
