import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './shared/services/usuario.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

    constructor(private userService: UsuarioService) {
      
    }

    ngOnInit() {
      this.userService.healthy().subscribe(() => {
        console.log('healthy');
      });
    }
}
