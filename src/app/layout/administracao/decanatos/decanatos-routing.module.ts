import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DecanatosPageComponent } from './containers/decanatos-page.component';

const routes: Routes = [
    {
        path: '',
        component: DecanatosPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DecanatosRoutingModule {}
