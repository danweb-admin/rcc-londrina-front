import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServosListComponent } from './containers/servos-list.component';

const routes: Routes = [
    {
        path: '',
        component:  ServosListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ServosListRoutingModule {}
