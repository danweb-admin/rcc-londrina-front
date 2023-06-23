import { Component, OnInit } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.scss'],
    imports: [NgbAccordionModule],
    animations: [routerTransition()]
})
export class InicioComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
