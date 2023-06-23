import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrupoOracaoComponent } from './components/grupo-oracao/grupo-oracao.component';
import { GrupoOracaoTableComponent } from './grupo-oracao-table.component';

const routes: Routes = [
    {
        path: '',
        component: GrupoOracaoTableComponent
    },
    {
        path: 'novo',
        component: GrupoOracaoComponent,

    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GrupoOracaoTableRoutingModule {}
