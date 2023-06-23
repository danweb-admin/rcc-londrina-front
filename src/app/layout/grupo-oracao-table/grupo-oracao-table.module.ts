import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbAccordionModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule } from '../../shared';
import { GrupoOracaoTableRoutingModule } from './grupo-oracao-table-routing.module';
import { GrupoOracaoTableComponent } from './grupo-oracao-table.component';
import { MatIconModule } from '@angular/material/icon';
import { GrupoOracaoBodyComponent } from './components/grupo-oracao-body/grupo-oracao-body.component';
import { LayoutModule } from '../layout.module';
import { GrupoOracaoComponent } from './components/grupo-oracao/grupo-oracao.component';
import { DadosCadastraisComponent } from './components/dados-cadastrais/dados-cadastrais.component';
import { NgxMaskModule } from 'ngx-mask';
import { ServosComponent } from './components/servos/servos.component';
import { ServosDialogComponent } from './components/servos/components/servos-dialog/servos-dialog.component';
import { NucleoComponent } from './components/nucleo/nucleo.component';
import { NucleoDialogComponent } from './components/nucleo/components/nucleo-dialog/nucleo-dialog.component';

@NgModule({
    imports: [
        CommonModule, 
        GrupoOracaoTableRoutingModule,
        LayoutModule,
        PageHeaderModule, 
        NgbAccordionModule,
        NgbNavModule,
        MatIconModule,
        NgxMaskModule.forRoot(),

        ],
    exports: [],
    declarations: [
        GrupoOracaoTableComponent,
        GrupoOracaoComponent,
        GrupoOracaoBodyComponent,
        DadosCadastraisComponent,
        ServosComponent,
        ServosDialogComponent,
        NucleoComponent,
        NucleoDialogComponent
        ]
})
export class GrupoOracaoTableModule {}
