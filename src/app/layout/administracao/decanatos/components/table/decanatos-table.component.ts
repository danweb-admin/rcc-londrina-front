import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Decanato } from '../../../../../shared/models/decanato';
import { DecanatoService } from '../../../../../shared/services/decanato.service';
import { DecanatosDialogComponent } from '../dialog/decanatos-dialog.component';

@Component({
  selector: 'app-decanatos-table',
  templateUrl: './decanatos-table.component.html',
  styleUrls: ['./decanatos-table.component.scss']
})
export class DecanatosTableComponent implements OnInit {
  
    closeResult = '';
    public dataSource: Decanato[] = [];

    constructor(private modalService: NgbModal, 
        private decanatoService: DecanatoService) {
    }

    public ngOnInit(): void {
        this.loadDecanatos();
    }

    loadDecanatos(){
        this.decanatoService.loadDecanatos(true).subscribe((resp: Decanato[]) => {
            this.dataSource = resp;
        });
    }

    openDialog(item: Decanato){
        const modalRef = this.modalService.open(DecanatosDialogComponent)
        modalRef.componentInstance.decanato = item;
        modalRef.result.then(res=>{
            this.loadDecanatos();
        },dismiss=>{
        console.log("Cross Button",dismiss)
        })
    }
}