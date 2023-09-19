import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-nucleo-dialog',
    templateUrl: './nucleo-dialog.component.html',
    styleUrls: ['./nucleo-dialog.component.scss'],
})
export class NucleoDialogComponent  {
    constructor(public activeModal: NgbActiveModal) {
    }
}
