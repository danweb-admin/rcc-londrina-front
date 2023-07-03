import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ParoquiaService } from '../../../../../shared/services/paroquia.service';
import { Paroquia } from '../../../../../shared/models/paroquia';
import { DecanatoService } from '../../../../../shared/services/decanato.service';
import { Decanato } from '../../../../../shared/models/decanato';


@Component({
    selector: 'app-paroquias-dialog',
    templateUrl: 'paroquias-dialog.component.html',
    styleUrls: ['./paroquias-dialog.component.scss']
  })
  export class ParoquiasDialogComponent implements OnInit, AfterViewInit{
    form: FormGroup;
    isAddMode: boolean = true;
    id: string;
    @Input() paroquia: Paroquia;
    decanatos: Decanato[];
    
    constructor(public activeModal: NgbActiveModal, 
                private formBuilder: FormBuilder,
                private paroquiaService: ParoquiaService,
                private decanatoService: DecanatoService,
                private toastr: ToastrService) {
                
        
    }
  ngAfterViewInit(): void {
    this.loadDecanatos();
  }

    ngOnInit(): void {
        if (this.paroquia != null){
            this.isAddMode = false;
        }
        
        this.form = this.formBuilder.group({
          id:  [this.paroquia?.id || ''],
          name: [this.paroquia?.name || '', Validators.required],
          active: [ this.isAddMode ? true : this.paroquia?.active, Validators.required],
          createdAt: [this.paroquia?.createdAt || new Date()],
          address: [this.paroquia?.address || '', Validators.required],
          city: [this.paroquia?.city,Validators.required],
          decanatoId: [this.paroquia?.decanatoId, Validators.required],
          neighborhood: [this.paroquia?.neighborhood || '', Validators.required],
          updatedAt: [ null],
        });

    }

    loadDecanatos(){
      this.decanatoService.loadDecanatos(true).subscribe((resp: Decanato[])=> {
        this.decanatos = resp;
      })
    }

    onSubmit(){
        if (this.form.value.id === ""){
          this.paroquiaService.save(this.form.value).subscribe((resp: Paroquia) => {
            this.toastr.success('Paroquia/Capela adicionada com sucesso.');
            this.activeModal.close(resp);
          },
          (error: any) =>{
            console.log(error);
            this.toastr.warning(error.error?.message)
          });
        } else {
          this.paroquiaService.update(this.form.value).subscribe((resp: Paroquia) => {
            this.toastr.success('Paroquia/Capela atualizada com sucesso.');
            this.activeModal.close(resp);
          },
          (error: any) =>{
            console.log(error);
            this.toastr.warning(error.error?.message)
          });
        }
    }
  }