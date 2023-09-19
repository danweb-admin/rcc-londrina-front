import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ServosComponent } from '../../servos.component';

@Component({
    selector: 'app-servos-dialog',
    templateUrl: './servos-dialog.component.html',
    styleUrls: ['./servos-dialog.component.scss'],
})
export class ServosDialogComponent  {
    constructor(public activeModal: NgbActiveModal) {
    }
}
