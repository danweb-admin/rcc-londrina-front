import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormacoesServo } from '../../../../../../shared/models/formacoes-servo';
import { FormacoesServoService } from '../../../../../../shared/services/formacoes-servo.service';
import { Servo } from '../../../../../../shared/models/servo';
import { ServoService } from '../../../../../../shared/services/servo.service';
import { FormacoesComponent } from '../formacoes/formacoes.component';
import { ValidateService } from '../../../../../../shared/services/validate-service';

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
                private validateService: ValidateService,
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

    onBlurBirthDate(input){
      const partesData = input.target.value.split('/');
      const element = document.getElementById(input.target.id) as HTMLInputElement;

      const dia = parseInt(partesData[0], 10);
      const mes = parseInt(partesData[1], 10);
      const ano = parseInt(partesData[2], 10);

      if (dia < 1 || dia > 31 || mes < 1 || mes > 12 || ano < 1900) {
        this.toastr.warning('Data de nascimento inválida');
        element.focus();
        return false;
      }
    }

    onBlurCellPhone(input){
      const length = input.target.value.length;
      const element = document.getElementById(input.target.id) as HTMLInputElement;

      if (length < 15) {
        this.toastr.warning('Celular inválido');
        element.focus();
        return false;
      }
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
    let cpf = this.form.value.cpf;
    if (!this.validateService.validarCpf(cpf)){
      this.toastr.warning("CPF Inválido.")
      return;
    }

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
