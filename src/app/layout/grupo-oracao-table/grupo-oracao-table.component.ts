import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-grupo-oracao-table',
    templateUrl: './grupo-oracao-table.component.html',
    styleUrls: ['./grupo-oracao-table.component.scss'],
    animations: [routerTransition()]
})
export class GrupoOracaoTableComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit() {}

    newGrupoOracao(){
        this.router.navigate(['/grupo-oracao/novo']).then();
    }
}
