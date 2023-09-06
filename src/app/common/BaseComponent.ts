import { ViewChildren, QueryList } from '@angular/core';
import { ProcessIndicatorComponent } from '../process-indicator/process-indicator.component';
import { SpinnerComponentComponent } from '../spinner-component/spinner-component.component';

export abstract class BaseComponent {

    @ViewChildren(ProcessIndicatorComponent) processIndList !: QueryList<ProcessIndicatorComponent>;
    @ViewChildren(SpinnerComponentComponent) spinnerList !: QueryList<SpinnerComponentComponent>;

    constructor() { }

    showProcessInd(name: string) {
        if (this.processIndList) {
            let item = this.processIndList.find(x => x.name === name && x.show === 'n')
            if (item) {
                item.toggle();
            }
        }
    }

    hideProcessInd(name: string) {
        if (this.processIndList) {
            let item = this.processIndList.find(x => x.name === name && x.show === 'y')
            if (item) {
                item.toggle();
            }
        }
    }

    showSpinner(name: string){
        if (this.spinnerList) {
            let item = this.spinnerList.find(x => x.name === name && x.mode === 'determinate')
            if (item) {
                item.showSpinner();
            }
        }
    }

    hideSpinner(name: string){
        if (this.spinnerList) {
            let item = this.spinnerList.find(x => x.name === name && x.mode === 'indeterminate')
            if (item) {
                item.hideSpinner();
            }
        }
    }

}