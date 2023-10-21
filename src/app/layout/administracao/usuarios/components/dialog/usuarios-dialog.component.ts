import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ParoquiaService } from '../../../../../shared/services/paroquia.service';
import { Paroquia } from '../../../../../shared/models/paroquia';
import { DecanatoService } from '../../../../../shared/services/decanato.service';
import { Decanato } from '../../../../../shared/models/decanato';
import { GrupoOracaoService } from '../../../../../shared/services/grupo-oracao.service';
import { GrupoOracao } from '../../../../../shared/models/grupo-oracao';
import { User } from '../../../../../shared/models/user';
import { UsuarioService } from '../../../../../shared/services/usuario.service';


@Component({
    selector: 'app-usuarios-dialog',
    templateUrl: 'usuarios-dialog.component.html',
    styleUrls: ['./usuarios-dialog.component.scss']
  })
  export class UsuariosDialogComponent implements OnInit, AfterViewInit{
    form: FormGroup;
    isAddMode: boolean = true;
    id: string;
    @Input() user: User;
    decanatos: Decanato[];
    listGrupoOracao: GrupoOracao[];
    
    constructor(public activeModal: NgbActiveModal, 
                private formBuilder: FormBuilder,
                private grupoOracaoService: GrupoOracaoService,
                private decanatoService: DecanatoService,
                private usuarioService: UsuarioService,
                private toastr: ToastrService) {
                
        
    }

    ngAfterViewInit(): void {
        this.loadDecanatos();
        this.loadGrupoOracao();
    }

    ngOnInit(): void {
        if (this.user != null){
            this.isAddMode = false;
        }
        
        this.form = this.formBuilder.group({
          id:  [this.user?.id || ''],
          name: [this.user?.name || '', Validators.required],
          active: [ this.isAddMode ? true : this.user?.active, Validators.required],
          createdAt: [this.user?.createdAt || new Date()],
          email: [this.user?.email || '', Validators.required],
          password: this.isAddMode ? ['', Validators.required] : [''],
          decanatoSetorId: [this.user?.decanatoSetorId || ''],
          grupoOracaoId: [this.user?.grupoOracaoId || '',],
          updatedAt: [ null],
        });

    }

    loadDecanatos(){
      this.decanatoService.loadDecanatos(true).subscribe((resp: Decanato[])=> {        
        this.decanatos = resp;
      })
    }

    loadGrupoOracao(){
        this.grupoOracaoService.loadGrupos(true,'').subscribe((resp: GrupoOracao[])=> {        
          this.listGrupoOracao = resp;
        })

    }

    onSubmit(){
        if (this.form.value.id === ""){
          this.usuarioService.save(this.form.value).subscribe((resp: User) => {
            this.toastr.success('Usuário adicionada com sucesso.');
            this.activeModal.close(resp);
          },
          (error: any) =>{
            console.log(error);
            this.toastr.warning(error.error?.message)
          });
        } else {
          this.usuarioService.update(this.form.value).subscribe((resp: User) => {
            this.toastr.success('Usuário atualizada com sucesso.');
            this.activeModal.close(resp);
          },
          (error: any) =>{
            console.log(error);
            this.toastr.warning(error.error?.message)
          });
        }
    }
  }