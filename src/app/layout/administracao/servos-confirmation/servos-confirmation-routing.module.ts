import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServosConfirmationComponent } from './containers/servos-confirmation.component';

const routes: Routes = [
    {
        path: '',
        component:  ServosConfirmationComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ServosConfirmationRoutingModule {}
