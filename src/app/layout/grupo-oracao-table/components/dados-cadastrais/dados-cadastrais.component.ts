import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { ToastrService } from 'ngx-toastr';
import { Decanato } from '../../../../shared/models/decanato';
import { GrupoOracao } from '../../../../shared/models/grupo-oracao';
import { Paroquia } from '../../../../shared/models/paroquia';
import { DecanatoService } from '../../../../shared/services/decanato.service';
import { GrupoOracaoService } from '../../../../shared/services/grupo-oracao.service';
import { ParoquiaService } from '../../../../shared/services/paroquia.service';

@Component({
    selector: 'app-dados-cadastrais',
    templateUrl: './dados-cadastrais.component.html',
    styleUrls: ['./dados-cadastrais.component.scss'],
})
export class DadosCadastraisComponent implements OnInit {
    form: FormGroup;
    isAddMode: boolean = true;
    id: string;
    user: string;
    decanatos: Decanato[] = [];
    paroquias: Paroquia[] = [];
    grupoOracao: GrupoOracao;
    @ViewChild('address') addres: ElementRef;
    @ViewChild('city') city: ElementRef;
    @ViewChild('neighborhood') neighborhood: ElementRef;
    @ViewChild('zipCode') zipCode: ElementRef;

    constructor(private formBuilder: FormBuilder,
        private grupoOracaoService: GrupoOracaoService,
        private paroquiaService: ParoquiaService,
        public navCtrl: NgxNavigationWithDataComponent,
        private toastr: ToastrService){
            this.grupoOracao = this.navCtrl.get('item'); 

    }

    ngOnInit(): void {
        this.initializeForm();
        this.loadParoquias();
        this.user = localStorage.getItem('user');
        
    }

    onChange(value) {
      if (confirm("Voce deseja puxar os dados da Paróquia? (Endereço, Bairro e Cidade) ")){
        const found = this.paroquias.find((obj) => {
          return obj.id == value
        });

        this.addres.nativeElement.value = found.address;
        this.neighborhood.nativeElement.value = found.neighborhood;
        this.city.nativeElement.value = found.city;
        this.zipCode.nativeElement.value = found.zipCode;
        this.form.controls['address'].setValue(found.address);
        this.form.controls['neighborhood'].setValue(found.neighborhood);
        this.form.controls['city'].setValue(found.city);
        this.form.controls['zipCode'].setValue(found.zipCode);
        
      }
    }


    loadParoquias(){
        this.paroquiaService.loadParoquias(true,'').subscribe((resp: Paroquia[]) => {
            this.paroquias = resp;
        })
    }

    initializeForm(){
      this.form = this.formBuilder.group({
          id:  [this.grupoOracao?.id || ''],
          active: [this.grupoOracao?.active || true],
          name: [this.grupoOracao?.name || '', Validators.required],
          paroquiaId: [this.grupoOracao?.paroquiaId || '', Validators.required],
          type: [this.grupoOracao?.type || '', Validators.required],
          dayOfWeek: [this.grupoOracao?.dayOfWeek || '', Validators.required],
          local: [this.grupoOracao?.local || '', Validators.required],
          time1: [this.grupoOracao?.time.substring(11,16) || '', Validators.required],
          foundationDate1: [this.formatDate(this.grupoOracao?.foundationDate) || '', Validators.required],
          address: [this.grupoOracao?.address || '', Validators.required],
          neighborhood: [this.grupoOracao?.neighborhood || '', Validators.required],
          zipCode: [this.grupoOracao?.zipCode || '', Validators.required],
          city: [this.grupoOracao?.city || '', Validators.required],
          email: [this.grupoOracao?.email || ''],
          site: [this.grupoOracao?.site || ''],
          telephone: [this.grupoOracao?.telephone || ''],
          numberOfParticipants: [0],
          createdAt: [this.grupoOracao?.createdAt || new Date()],
          updatedAt: [ this.grupoOracao?.updatedAt],
          formsUrl: [this.grupoOracao?.formsUrl || ''],
          csvUrl: [this.grupoOracao?.csvUrl || '']
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

    importCSV(){
      let grupoOracaoId = this.form.value.id;
      this.grupoOracaoService.importCSV(grupoOracaoId).subscribe((resp: GrupoOracao) => {
        this.toastr.success('Arquivo CSV importado com sucesso.');
        this.navCtrl.navigate('grupo-oracao');            
      },
      (error: any) =>{
        console.log(error);
        this.toastr.warning(error.error?.message)
      });

    }

    saveGO(){
        if (this.form.value.id === ""){
          this.grupoOracaoService.save(this.form.value).subscribe((resp: GrupoOracao) => {
            this.toastr.success('Grupo de Oração adicionado com sucesso.');
            this.navCtrl.navigate('grupo-oracao');            
          },
          (error: any) =>{
            console.log(error);
            this.toastr.warning(error.error?.message)
          });
        } else {
          this.grupoOracaoService.update(this.form.value).subscribe((resp: GrupoOracao) => {
            this.toastr.success('Grupo de Oração atualizado com sucesso.');
            this.navCtrl.navigate('grupo-oracao');            
          },
          (error: any) =>{
            console.log(error);
            this.toastr.warning(error.error?.message)
          });
        }
        
    }
    
}
