import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask'
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServosConfirmationComponent } from './containers/servos-confirmation.component';
import { ServosConfirmationRoutingModule } from './servos-confirmation-routing.module';
import { ServosConfirmationTableComponent } from './components/servos-confirmation-table/servos-confirmation-table.component';
import { ServosConfirmationDialogComponent } from './components/servos-confirmation-dialog/servos-confirmation-dialog.component';
import { ServoTempService } from '../../../shared/services/servo-temp.service';


@NgModule({
  declarations: [
      ServosConfirmationComponent,
      ServosConfirmationTableComponent,
      ServosConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    ServosConfirmationRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
  ],
  providers: [
    ServoTempService
  ]
})
export class ServosConfirmationModule { }
