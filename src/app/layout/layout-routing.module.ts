import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
            },
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
                loadChildren: () => import('./grupo-oracao-table/grupo-oracao-table.module').then((m) => m.GrupoOracaoTableModule)
            },
            {
                path: 'decanatos',
                loadChildren: () => import('./administracao/decanatos/decanatos.module').then((m) => m.DecanatosModule)
            },
            {
                path: 'paroquias',
                loadChildren: () => import('./administracao/paroquias/paroquias.module').then((m) => m.ParoquiasModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
