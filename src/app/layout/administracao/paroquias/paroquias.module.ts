import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask'
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DecanatoService } from '../../../shared/services/decanato.service';
import { ParoquiasRoutingModule } from './paroquias-routiing.module';
import { ParoquiasPageComponent } from './containers/paroquias-page.component';
import { ParoquiasDialogComponent } from './components/dialog/paroquias-dialog.component';
import { ParoquiasTableComponent } from './components/table/paroquias-table.component';


@NgModule({
  declarations: [
      ParoquiasPageComponent,
      ParoquiasTableComponent,
      ParoquiasDialogComponent,
  ],
  imports: [
    CommonModule,
    ParoquiasRoutingModule,
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
export class ParoquiasModule { }
