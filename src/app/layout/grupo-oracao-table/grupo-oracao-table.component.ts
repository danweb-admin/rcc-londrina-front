import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GrupoOracao } from '../../shared/models/grupo-oracao';
import { GrupoOracaoService } from '../../shared/services/grupo-oracao.service';
import { routerTransition } from '../../router.animations';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CustomPaginator } from '../../shared/shared';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

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
    modelChanged: Subject<string> = new Subject<string>();


    constructor(private router: Router,
                public navCtrl: NgxNavigationWithDataComponent,
                private grupoOracaoService: GrupoOracaoService) {}

    ngOnInit() {
        this.loadGrupos('');
        this.modelChanged.pipe(
            debounceTime(500), 
            distinctUntilChanged())
            .subscribe((search: any )=> {
                if (search.target.value.length > 2){
                    this.loadGrupos(search.target.value)
                }
            }
            );
    }

    changed(text: string) {
        this.modelChanged.next(text);
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
            
        });
        if (this.paginator) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.paginator._intl = CustomPaginator();
          }
    }
}
