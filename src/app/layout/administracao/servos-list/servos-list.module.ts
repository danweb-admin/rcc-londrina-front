import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask'
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServosListTableComponent } from './components/servos-list-table/servos-list-table.component';
import { ServoTempService } from '../../../shared/services/servo-temp.service';
import { ServosListComponent } from './containers/servos-list.component';
import { ServosListRoutingModule } from './servos-list-routing.module';


@NgModule({
  declarations: [
      ServosListComponent,
      ServosListTableComponent
  ],
  imports: [
    CommonModule,
    ServosListRoutingModule,
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
export class ServosListModule { }
