import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NucleoDialogComponent } from './components/nucleo-dialog/nucleo-dialog.component';

@Component({
    selector: 'app-nucleo',
    templateUrl: './nucleo.component.html',
    styleUrls: ['./nucleo.component.scss'],
})
export class NucleoComponent  {
    closeResult = '';
    constructor(private modalService: NgbModal) {
    }

    addNucleo(){
        const modalRef = this.modalService.open(NucleoDialogComponent,{ size: 'lg' }).result.then(
            (result) => {
            
				this.closeResult = `Closed with: ${result}`;
			}
        );
    }
}
