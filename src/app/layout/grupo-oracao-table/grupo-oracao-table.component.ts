import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GrupoOracao } from '../../shared/models/grupo-oracao';
import { GrupoOracaoService } from '../../shared/services/grupo-oracao.service';
import { routerTransition } from '../../router.animations';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';

@Component({
    selector: 'app-grupo-oracao-table',
    templateUrl: './grupo-oracao-table.component.html',
    styleUrls: ['./grupo-oracao-table.component.scss'],
    animations: [routerTransition()]
})
export class GrupoOracaoTableComponent implements OnInit {

    public listOfGroups: GrupoOracao[] = [];

    constructor(private router: Router,
                public navCtrl: NgxNavigationWithDataComponent,
                private grupoOracaoService: GrupoOracaoService) {}

    ngOnInit() {
        this.loadGrupos();
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

    loadGrupos(){
        this.grupoOracaoService.loadGrupos(true, '').subscribe((resp: GrupoOracao[]) => {
            this.listOfGroups = resp;
            console.log(this.listOfGroups);
            
        })
    }
}
