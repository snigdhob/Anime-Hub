import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-process-indicator',
  templateUrl: './process-indicator.component.html',
  styleUrls: ['./process-indicator.component.sass']
})
export class ProcessIndicatorComponent implements OnInit {

  @Input() show : string = 'n';
  @Input() name : string;

  constructor() { }

  ngOnInit(): void {
  }

  toggle(){
    this.show = this.show === 'y' ? 'n' : 'y';
  }

  // showProcessIndicator(){
  //   this.show = true;
  // }

  // hideProcessIndicator(){
  //   this.show = false;
  // }

}
