import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask'
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UsuariosPageComponent } from './containers/usuarios-page.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosDialogComponent } from './components/dialog/usuarios-dialog.component';
import { UsuariosTableComponent } from './components/table/usuarios-table.component';
import { UsuarioService } from '../../../shared/services/usuario.service';


@NgModule({
  declarations: [
      UsuariosPageComponent,
      UsuariosTableComponent,
      UsuariosDialogComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
  ],
  providers: [
    UsuarioService
  ]
})
export class UsuariosModule { }
