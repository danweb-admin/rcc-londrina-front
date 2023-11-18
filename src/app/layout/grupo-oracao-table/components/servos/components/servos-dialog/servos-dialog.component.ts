import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormacoesServo } from '../../../../../../shared/models/formacoes-servo';
import { FormacoesServoService } from '../../../../../../shared/services/formacoes-servo.service';
import { Servo } from '../../../../../../shared/models/servo';
import { ServoService } from '../../../../../../shared/services/servo.service';
import { FormacoesComponent } from '../formacoes/formacoes.component';

@Component({
    selector: 'app-servos-dialog',
    templateUrl: './servos-dialog.component.html',
    styleUrls: ['./servos-dialog.component.scss'],
})
export class ServosDialogComponent  {
    form: FormGroup;
    isAddMode: boolean = true;
    id: string;
    grupoOracaoId: string;
    formacoesServo: FormacoesServo[];
    @Input() servo: Servo;
    @Input() grupo_oracao_id: string; 

    constructor(public activeModal: NgbActiveModal,
                private formBuilder: FormBuilder,
                private servoService: ServoService,
                private modalService: NgbModal,
                private formacoesServoService: FormacoesServoService,
                private toastr: ToastrService) {
                  
    }

    ngOnInit(): void {
        this.grupoOracaoId = this.grupo_oracao_id
        
        if (this.servo != null){
            this.isAddMode = false;
        }
        
        this.form = this.formBuilder.group({
          id:  [this.servo?.id || ''],
          name: [this.servo?.name || '', Validators.required],
          birthday1: [this.formatDate(this.servo?.birthday) || '', Validators.required],
          cpf: [this.servo?.cpf || '', Validators.required],
          email: [this.servo?.email || '', Validators.required],
          cellphone: [this.servo?.cellPhone || '', Validators.required],
          mainMinistry: [this.servo?.mainMinistry || '', Validators.required],
          secondaryMinistry: [this.servo?.secondaryMinistry || ''],
          grupoOracaoId: [this.grupo_oracao_id],
          active: [ this.isAddMode ? true : this.servo?.active, Validators.required],
          createdAt: [this.servo?.createdAt || new Date()],
          updatedAt: [ null],
        });

        this.loadFormacoesServo(this.form.value.id);
    }

    openDialog(item){
      const modalRef = this.modalService.open(FormacoesComponent,{ size: 'lg' })
      modalRef.result.then(
          (result) => {
              
        }
      );
  }

  loadFormacoesServo(servoId: string){
    if (servoId != ""){
      this.formacoesServoService.loadFormacoesByServo(servoId).subscribe((resp: FormacoesServo[]) => {
        this.formacoesServo = resp;
      })
    }
  }

  removeFormacaoServo(formacaoServoid: string){
    if (confirm("Voce deseja remover essa formação? ")){
      this.formacoesServoService.delete(formacaoServoid).subscribe(() => {
        this.loadFormacoesServo(this.form.value.id);
      })
    }
    
  }


  onSubmit(){
    if (this.form.value.id === ""){
      this.servoService.save(this.form.value).subscribe((resp: Servo) => {
        this.toastr.success('Servo(a) adicionado(a) com sucesso.');
        this.activeModal.close(resp);
      },
      (error: any) =>{
        console.log(error);
        this.toastr.warning(error.error?.message)
      });
    } else {
      this.servoService.update(this.form.value).subscribe((resp: Servo) => {
        this.toastr.success('Servo(a) atualizado(a) com sucesso.');
        this.activeModal.close(resp);
      },
      (error: any) =>{
        console.log(error);
        this.toastr.warning(error.error?.message)
      });
      }
    }

    formatDate(date: string){      
      if (date === '' || date === undefined){
        return '';
      }

      let year = date.substring(0,4);
      let month = date.substring(5,7);
      let day = date.substring(8,10);

      return `${day}/${month}/${year}`;
    }
}
