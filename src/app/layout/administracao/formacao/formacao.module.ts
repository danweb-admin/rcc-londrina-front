import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask'
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DecanatoService } from '../../../shared/services/decanato.service';
import { FormacaoPageComponent } from './containers/formacao-page.component';
import { FormacaoRoutingModule } from './formacao-routing.module';
import { FormacaoTableComponent } from './components/table/formacao-table.component';
import { FormacaoDialogComponent } from './components/dialog/formacao-dialog.component';
import { FormacoesComponent } from '../../grupo-oracao-table/components/servos/components/formacoes/formacoes.component';
import { FormacoesDialogComponent } from './components/dialog-formacoes/formacoes-dialog.component';


@NgModule({
  declarations: [
      FormacaoPageComponent,
      FormacaoTableComponent,
      FormacaoDialogComponent,
      FormacoesDialogComponent
  ],
  imports: [
    CommonModule,
    FormacaoRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
  ],
  providers: [
    DecanatoService
  ]
})
export class FormacaoModule { }
