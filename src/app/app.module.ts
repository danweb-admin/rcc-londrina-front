import { CommonModule, Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { AuthGuard } from './shared';
import { InterceptorModule } from './shared/interceptor/interceptor.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';


@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        InterceptorModule,
        LayoutModule,
        MatProgressSpinnerModule,
        NgxSpinnerModule,
        NgxMaskModule.forRoot(),
        ToastrModule.forRoot({
            preventDuplicates: true,
        }),
    ],
    declarations: [AppComponent,
    ],
    providers: [AuthGuard, NgxNavigationWithDataComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
