import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Decanato } from '../../../../../shared/models/decanato';
import { ToastrService } from 'ngx-toastr';
import { Formacao } from '../../../../../shared/models/formacao';
import { FormacaoService } from '../../../../../shared/services/formacao.service';
import { GrupoOracaoService } from '../../../../../shared/services/grupo-oracao.service';
import { GrupoOracao } from '../../../../../shared/models/grupo-oracao';
import { Servo } from '../../../../../shared/models/servo';
import { ServoService } from '../../../../../shared/services/servo.service';
import { FormacoesServoService } from '../../../../../shared/services/formacoes-servo.service';

@Component({
    selector: 'app-formacoes-dialog',
    templateUrl: 'formacoes-dialog.component.html',
    styleUrls: ['./formacoes-dialog.component.scss']
  })
  export class FormacoesDialogComponent{
    form: FormGroup;
    isAddMode: boolean = true;
    id: string;
    formacoes: Formacao[];
    listGrupoOracao: GrupoOracao[];
    servos: Servo[] = [];
    
    constructor(public activeModal: NgbActiveModal, 
                private formBuilder: FormBuilder,
                private formacaoService: FormacaoService,
                private grupoOracaoService: GrupoOracaoService,
                private servoService: ServoService,
                private formacoesServoService: FormacoesServoService,
                private toastr: ToastrService) {
    }

    ngOnInit(): void {
        this.loadFormacoes();
        this.loadGrupoOracao();
        
        this.form = this.formBuilder.group({
          servosId:  [''],
          grupoOracaoId: [''],
          formacaoId: [''],
          certificateDate1: ['']
        });

    }

    loadFormacoes(){
        this.formacaoService.loadFormacoes(true).subscribe((resp: Formacao[]) => {
            this.formacoes = resp;
        });
    }

    loadGrupoOracao(){
        this.grupoOracaoService.loadGrupos(true,'').subscribe((resp: GrupoOracao[])=> {        
          this.listGrupoOracao = resp;
        });
    }

    loadServosByGrupoOracao(grupoOracaoId: string){
        this.servoService.loadServosByGrupoOracao(grupoOracaoId).subscribe((resp: Servo[]) => {
            this.servos = resp;            
        });
    }

    onSubmit(){
        
        this.formacoesServoService.save(this.form.value).subscribe((resp: Formacao) => {
            this.toastr.success('Formação adicionada com sucesso.');
            this.activeModal.close(resp);
        },
        (error: any) =>{
            console.log(error);
            this.toastr.warning(error.error?.message)
        });
        
    }
  }