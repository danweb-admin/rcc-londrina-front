import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Servo } from '../../../../../../shared/models/servo';
import { ServoService } from '../../../../../../shared/services/servo.service';

@Component({
    selector: 'app-formacao-dialog',
    templateUrl: './formacao-dialog.component.html',
    styleUrls: ['./formacao-dialog.component.scss'],
})
export class FormacaoDialogComponent  {
    form: FormGroup;
    isAddMode: boolean = true;
    id: string;
    grupoOracaoId: string;
    @Input() servo: Servo;
    @Input() grupo_oracao_id: string; 

    constructor(public activeModal: NgbActiveModal,
                private formBuilder: FormBuilder,
                private servoService: ServoService,
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

    
}
