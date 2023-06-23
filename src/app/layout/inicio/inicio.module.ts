import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule } from './../../shared';
import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';


@NgModule({
    imports: [
        CommonModule, 
        InicioRoutingModule, 
        PageHeaderModule, 
        NgbAccordionModule],
    declarations: [InicioComponent]
})
export class InicioModule {}
