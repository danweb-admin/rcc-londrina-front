import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Servo } from '../../../../../shared/models/servo';
import { ServoTempService } from '../../../../../shared/services/servo-temp.service';
import { ValidateService } from '../../../../../shared/services/validate-service';


@Component({
    selector: 'app-servos-confirmation-dialog',
    templateUrl: 'servos-confirmation-dialog.component.html',
    styleUrls: ['./servos-confirmation-dialog.component.scss']
  })
  export class ServosConfirmationDialogComponent{
    form: FormGroup;
    isAddMode: boolean = true;
    id: string;
    @Input() servo: Servo;
    @Input() grupo_oracao_id: string; 
    
    constructor(public activeModal: NgbActiveModal, 
                private formBuilder: FormBuilder,
                private toastr: ToastrService,
                private servoTempService: ServoTempService,
                private validateService: ValidateService,
                ) {
    }

    ngOnInit(): void {
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

    }

    onSubmit(){
      let cpf = this.form.value.cpf;
      if (!this.validateService.validarCpf(cpf)){
        this.toastr.warning("CPF Inválido.")
        return;
      }

      this.servoTempService.update(this.form.value).subscribe(() => {
        this.toastr.success('Servo validado com sucesso.');
        this.activeModal.close(this.form.value);
      },
      (error: any) =>{
        console.log(error);
        this.toastr.warning(error.error?.message)
      });
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