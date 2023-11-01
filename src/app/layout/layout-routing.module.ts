import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            
            {
                path: 'blank-page',
                loadChildren: () => import('./blank-page/blank-page.module').then((m) => m.BlankPageModule)
            },
            {
                path: 'inicio',
                loadChildren: () => import('./inicio/inicio.module').then((m) => m.InicioModule)
            },
            {
                path: 'grupo-oracao',
                loadChildren: () => import('./grupo-oracao-table/grupo-oracao-table.module').then((m) => m.GrupoOracaoTableModule),
                canActivate: [AuthGuard]

            },
            {
                path: 'decanatos',
                loadChildren: () => import('./administracao/decanatos/decanatos.module').then((m) => m.DecanatosModule),
                canActivate: [AuthGuard]

            },
            {
                path: 'paroquias',
                loadChildren: () => import('./administracao/paroquias/paroquias.module').then((m) => m.ParoquiasModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'usuarios',
                loadChildren: () => import('./administracao/usuarios/usuarios.module').then((m) => m.UsuariosModule),
                canActivate: [AuthGuard]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
