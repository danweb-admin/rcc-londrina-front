import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { FormacaoService } from '../../../../../shared/services/formacao.service';
import { Formacao } from '../../../../../shared/models/formacao';
import { FormacoesDialogComponent } from '../dialog-formacoes/formacoes-dialog.component';
import { FormacaoDialogComponent } from '../dialog/formacao-dialog.component';

@Component({
  selector: 'app-formacao-table',
  templateUrl: './formacao-table.component.html',
  styleUrls: ['./formacao-table.component.scss']
})
export class FormacaoTableComponent implements OnInit {
  
    closeResult = '';
    public dataSource: Formacao[] = [];

    constructor(private modalService: NgbModal, 
        private formacaoService: FormacaoService) {
    }

    public ngOnInit(): void {
        this.loadFormacoes();
    }

    loadFormacoes(){
        this.formacaoService.getAllFormacoes().subscribe((resp: Formacao[]) => {
            this.dataSource = resp;
        });
    }

    openDialog(item: Formacao){
        const modalRef = this.modalService.open(FormacaoDialogComponent)
        modalRef.componentInstance.formacao = item;
        modalRef.result.then(res=>{
            this.loadFormacoes();
        },dismiss=>{
        console.log("Cross Button",dismiss)
        })
    }

    openDialogFormacoes(){
        const modalRef = this.modalService.open(FormacoesDialogComponent, {'size': 'lg'})
        modalRef.result.then(res=>{
            this.loadFormacoes();
        },dismiss=>{
        console.log("Cross Button",dismiss)
        })
    }
}