import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask'
import { DecanatosRoutingModule } from './decanatos-routing.module';
import { DecanatosPageComponent } from './containers/decanatos-page.component';
import { DecanatosTableComponent } from './components/table/decanatos-table.component';
import { DecanatosDialogComponent } from './components/dialog/decanatos-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DecanatoService } from '../../../shared/services/decanato.service';


@NgModule({
  declarations: [
      DecanatosPageComponent,
      DecanatosTableComponent,
      DecanatosDialogComponent,
  ],
  imports: [
    CommonModule,
    DecanatosRoutingModule,
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
export class DecanatosModule { }
