import { Component, OnInit, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner-component',
  templateUrl: './spinner-component.component.html',
  styleUrls: ['./spinner-component.component.sass']
})
export class SpinnerComponentComponent implements OnInit {

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 0;
  @Input() spinnerClass: string = 'horizontal-flex-center';
  @Input() name: string;

  constructor() { }

  ngOnInit(): void {
  }

  showSpinner() {
    this.mode = 'indeterminate';
    this.value = 40;
  }

  hideSpinner() {
    this.mode = 'determinate';
    this.value = 0;
  }

}
