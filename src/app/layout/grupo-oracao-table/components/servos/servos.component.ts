import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { Servo } from '../../../../shared/models/servo';
import { ServoService } from '../../../../shared/services/servo.service';
import { GrupoOracao } from '../../../../shared/models/grupo-oracao';
import { ServosDialogComponent } from './components/servos-dialog/servos-dialog.component';

@Component({
    selector: 'app-servos',
    templateUrl: './servos.component.html',
    styleUrls: ['./servos.component.scss'],
})
export class ServosComponent implements OnInit {
    closeResult = '';
    servos: Servo[] = [];
    @Input() grupoOracao: GrupoOracao;
    ministries = [];

    constructor(private modalService: NgbModal,
        public navCtrl: NgxNavigationWithDataComponent,
        private servoService: ServoService
        ) {
            this.grupoOracao =  this.navCtrl.get('item');
	}
    ngOnInit(): void {
        this.loadServos();
        this.loadMinistiries();
    }

    loadServos(): void{
        this.servoService.loadServosByGrupoOracao(this.grupoOracao.id).subscribe((resp: Servo[]) => {
            this.servos = resp;            
        })
    }

    openDialog(item){
        const modalRef = this.modalService.open(ServosDialogComponent,{ size: 'lg' })
        modalRef.componentInstance.grupo_oracao_id = this.grupoOracao.id;
        modalRef.componentInstance.servo = item;
        modalRef.result.then(
            (result) => {
                this.loadServos();
				this.closeResult = `Closed with: ${result}`;
			}
        );
    }

    describeMinistry(key: string){
       return this.ministries.find(x => x.key == key).value
    }

    loadMinistiries(){
        this.ministries = 
        [
            { key: "coordenadores", value: "Coordenadores"},
            { key: "musica-artes", value: "Música & Artes"},
            { key: "pregacao", value: "Pregação"},
            { key: "promocao-humana", value: "Promoção Humana"},
            { key: "fe-politica", value: "Fé e Politica"},
            { key: "formacao", value: "Formação"},
            { key: "intercessao", value: "Intercessão"},
            { key: "cura-libertacao", value: "Cura e Libertação"},
            { key: "jovem", value: "Jovem"},
            { key: "criancas-adolescentes", value: "Crianças e Adolescentes"},
            { key: "comunicacao", value: "Comunicação"},
            { key: "familias", value: "Para as Famílias"},
            { key: "universidades", value: "Universidades"},
            { key: "religiosas", value: "Para as Religiosas"},
            { key: "seminaristas", value: "Seminaristas"},
            { key: "cristo-sacerdote", value: "Cristo Sacerdote"},
            { key: "discernimento", value: "Em Discernimento"},
        ]
    }
}
