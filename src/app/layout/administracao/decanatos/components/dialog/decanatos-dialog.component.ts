import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DecanatoService } from '../../../../../shared/services/decanato.service';
import { Decanato } from '../../../../../shared/models/decanato';

@Component({
    selector: 'app-decanatos-dialog',
    templateUrl: 'decanatos-dialog.component.html',
    styleUrls: ['./decanatos-dialog.component.scss']
  })
  export class DecanatosDialogComponent{
    form: FormGroup;
    isAddMode: boolean = true;
    id: string;
    @Input() decanato: Decanato;
    
    constructor(public activeModal: NgbActiveModal, 
                private formBuilder: FormBuilder,
                private decanatoService: DecanatoService) {
                
        
    }

    ngOnInit(): void {
        if (this.decanato != null){
            this.isAddMode = false;
        }
        
        this.form = this.formBuilder.group({
          id:  [this.decanato?.id || ''],
          name: [this.decanato?.name || '', Validators.required],
          active: [ this.isAddMode ? true : this.decanato?.active, Validators.required],
          createdAt: [this.decanato?.createdAt || new Date()],
          updatedAt: [ null],
        });

    }

    onSubmit(){
        if (this.form.value.id === ""){
          this.decanatoService.save(this.form.value).subscribe((resp: Decanato) => {
            
            this.activeModal.close(resp);
          });
        } else {
          this.decanatoService.update(this.form.value).subscribe((resp: Decanato) => {
            this.activeModal.close(resp);
          });
        }
    }
  }