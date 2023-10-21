import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GrupoOracao } from '../../shared/models/grupo-oracao';
import { GrupoOracaoService } from '../../shared/services/grupo-oracao.service';
import { routerTransition } from '../../router.animations';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CustomPaginator } from '../../shared/shared';

@Component({
    selector: 'app-grupo-oracao-table',
    templateUrl: './grupo-oracao-table.component.html',
    styleUrls: ['./grupo-oracao-table.component.scss'],
    animations: [routerTransition()]
})
export class GrupoOracaoTableComponent implements OnInit {

    public displayedColumns: string[] = ['nome', 'paroquia', 'decanato', 'cidade', 'tipo','acoes'];
    public dataSource: MatTableDataSource<GrupoOracao> = new MatTableDataSource<GrupoOracao>();
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild('inputSearch') inputSearch: ElementRef;

    constructor(private router: Router,
                public navCtrl: NgxNavigationWithDataComponent,
                private grupoOracaoService: GrupoOracaoService) {}

    ngOnInit() {
        this.loadGrupos('');
    }

    applyFilter(event: Event): void {
        const inputValue = this.inputSearch.nativeElement.value;
        const length = inputValue.length;

        if (length > 2) {
            const filterValue = (event.target as HTMLInputElement).value;
            this.loadGrupos(filterValue);
        }
    }

    closeFilterInput(): void {
        this.inputSearch.nativeElement.value = '';
        this.loadGrupos('');
    }

    newGrupoOracao(){
        this.router.navigate(['/grupo-oracao/novo']).then();
    }

    describeType(type: string) {
        switch (type) {
            case 'adulto':
              return 'ADULTO'
            case 'adolescente':
              return 'ADOLESCENTE'
            case 'jovem':
              return 'JOVEM'
            default:
              return 'MISTO'
          }
    }

    navigateGrupoOracao(item){
        this.navCtrl.navigate('grupo-oracao/edicao', {item: item});    
    }

    loadGrupos(search: string){
        this.grupoOracaoService.loadGrupos(true, search).subscribe((resp: GrupoOracao[]) => {
            this.dataSource = new MatTableDataSource<GrupoOracao>();
            this.dataSource = new MatTableDataSource<GrupoOracao>(resp);            
            this.dataSource.paginator = this.paginator;  
            console.log(resp);
            
            
        });
        if (this.paginator) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.paginator._intl = CustomPaginator();
          }
    }
}
