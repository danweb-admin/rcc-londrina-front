import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Decanato } from '../../../../../shared/models/decanato';
import { ToastrService } from 'ngx-toastr';
import { Formacao } from '../../../../../shared/models/formacao';
import { FormacaoService } from '../../../../../shared/services/formacao.service';


@Component({
    selector: 'app-formacao-dialog',
    templateUrl: 'formacao-dialog.component.html',
    styleUrls: ['./formacao-dialog.component.scss']
  })
  export class FormacaoDialogComponent{
    form: FormGroup;
    isAddMode: boolean = true;
    id: string;
    @Input() formacao: Formacao; 
    
    constructor(public activeModal: NgbActiveModal, 
                private formBuilder: FormBuilder,
                private formacaoService: FormacaoService,
                private toastr: ToastrService) {
                
        
    }

    ngOnInit(): void {
        if (this.formacao != null){
            this.isAddMode = false;
        }
        
        this.form = this.formBuilder.group({
          id:  [this.formacao?.id || ''],
          name: [this.formacao?.name || '', Validators.required],
          active: [ this.isAddMode ? true : this.formacao?.active, Validators.required],
          createdAt: [this.formacao?.createdAt || new Date()],
          updatedAt: [ null],
        });

    }

    onSubmit(){
        if (this.form.value.id === ""){
          this.formacaoService.save(this.form.value).subscribe((resp: Decanato) => {
            this.toastr.success('Formação adicionada com sucesso.');
            this.activeModal.close(resp);
          },
          (error: any) =>{
            console.log(error);
            this.toastr.warning(error.error?.message)
          });
        } else {
          this.formacaoService.update(this.form.value).subscribe((resp: Decanato) => {
            this.activeModal.close(resp);
          },
          (error: any) =>{
            console.log(error);
            this.toastr.warning(error.error?.message)
          });
        }
    }
  }