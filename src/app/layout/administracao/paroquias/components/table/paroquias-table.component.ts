import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Paroquia } from '../../../../../shared/models/paroquia';
import { ParoquiaService } from '../../../../../shared/services/paroquia.service';
import { ParoquiasDialogComponent } from '../dialog/paroquias-dialog.component';

@Component({
  selector: 'app-paroquias-table',
  templateUrl: './paroquias-table.component.html',
  styleUrls: ['./paroquias-table.component.scss']
})
export class ParoquiasTableComponent implements OnInit {
  
    closeResult = '';
    public dataSource: Paroquia[] = [];

    constructor(private modalService: NgbModal, 
        private paroquiaService: ParoquiaService) {
    }

    public ngOnInit(): void {
        this.loadParoquias();
    }

    loadParoquias(){
        this.paroquiaService.loadParoquias(true).subscribe((resp: Paroquia[]) => {
            this.dataSource = resp;
        });
    }

    openDialog(item: Paroquia){
        const modalRef = this.modalService.open(ParoquiasDialogComponent, {'size': 'lg'})
        modalRef.componentInstance.paroquia = item;
        modalRef.result.then(res=>{
            this.loadParoquias();
        },dismiss=>{
        console.log("Cross Button",dismiss)
        })
    }
}