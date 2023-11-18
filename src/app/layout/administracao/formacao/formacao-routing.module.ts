import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormacaoPageComponent } from './containers/formacao-page.component';

const routes: Routes = [
    {
        path: '',
        component:  FormacaoPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormacaoRoutingModule {}
