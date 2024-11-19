import { Component, OnInit } from '@angular/core';
import { Servo } from '../../../../../shared/models/servo';
import { ServoTempService } from '../../../../../shared/services/servo-temp.service';
import { ToastrService } from 'ngx-toastr';
import { GrupoOracaoService } from '../../../../../shared/services/grupo-oracao.service';
import { GrupoOracao } from '../../../../../shared/models/grupo-oracao';

@Component({
  selector: 'app-servos-list-table',
  templateUrl: './servos-list-table.component.html',
  styleUrls: ['./servos-list-table.component.scss']
})
export class ServosListTableComponent implements OnInit {
  
    closeResult = '';
    public dataSource: Servo[] = [];
    public filters = {
        grupo: '',
        decanato: '',
        ministerio: '',
    }; // Filtros dinâmicos
    public filterOptions = {
        grupo: [] as string[],
        decanato: [] as string[],
        ministerio: [] as string[],
    }; // Opções para os selects
    public filteredDataSource: Servo[] = [];
    

    constructor(private servoTempService: ServoTempService,
                private grupoOracaoService: GrupoOracaoService,
                private toastService: ToastrService
        ) {
    }

    public ngOnInit(): void {
        // this.loadGrupos();
        this.loadServos();

    }

    loadGrupos(){
        this.grupoOracaoService.loadGrupos(true,'').subscribe((resp: GrupoOracao[]) => {
            this.filterOptions.grupo = resp.map(g => g.name);
        });
    }

    loadServos(){
        this.servoTempService.loadServos().subscribe((resp: Servo[]) => {
            this.dataSource = resp;
            this.filteredDataSource = [...this.dataSource];
            this.generateFilterOptions();
        });
    }

    generateFilterOptions(): void {
        // Gera opções únicas para os selects de filtro
        this.filterOptions.grupo = [...new Set(this.dataSource.map(servo => servo.grupoOracao.name))];
        this.filterOptions.ministerio = [...new Set(this.dataSource.map(servo => servo.mainMinistry))];
        this.filterOptions.decanato = [...new Set(this.dataSource.map(servo => servo.grupoOracao.paroquiaCapela.decanatoSetor.name))];
    }

    applyFilters(): void {
        this.filteredDataSource = this.dataSource.filter(servo => {
            return (
                (!this.filters.grupo || servo.grupoOracao.name === this.filters.grupo) &&
                (!this.filters.ministerio || servo.mainMinistry === this.filters.ministerio || servo.secondaryMinistry === this.filters.ministerio )) &&
                (!this.filters.decanato || servo.grupoOracao.paroquiaCapela.decanatoSetor.name === this.filters.decanato
            );
        });
    }

    checked(id: string, item){
        let servoTemp = {
            id: id
        } as unknown as Servo;

        this.servoTempService.checked(servoTemp).subscribe(() => {
            this.toastService.success('Servo(a) validado com sucesso!');
            item.checked = true;
        })

    }

    openDialog(item: Servo){
        if (item.checked){
            this.toastService.error('Este(a) servo(a) já foi validado');
            return;
        }   
    }
}