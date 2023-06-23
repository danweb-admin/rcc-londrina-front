import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServosDialogComponent } from './components/servos-dialog/servos-dialog.component';

@Component({
    selector: 'app-servos',
    templateUrl: './servos.component.html',
    styleUrls: ['./servos.component.scss'],
})
export class ServosComponent  {
    closeResult = '';

    constructor(private modalService: NgbModal) {
	}

    addServo(){
        const modalRef = this.modalService.open(ServosDialogComponent,{ size: 'lg' }).result.then(
            (result) => {
            
				this.closeResult = `Closed with: ${result}`;
			}
        );
    }
}
