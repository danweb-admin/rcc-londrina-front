import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParoquiasPageComponent } from './containers/paroquias-page.component';

const routes: Routes = [
    {
        path: '',
        component: ParoquiasPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ParoquiasRoutingModule {}
