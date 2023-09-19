import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    @Output() sendLoginForm = new EventEmitter<void>();
    public form: FormGroup;
    public email = '';
    public password = '';

    constructor(private authService: AuthService,
                private router: Router) {}

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(this.email, [Validators.required]),
            password: new FormControl(this.password, [Validators.required])
        });
    }

    onLoggedin() {
        if (this.form.valid) {
            this.authService.login(this.form.value.email, this.form.value.password).subscribe((resp: any) => {
              if (resp?.name){
                this.sendLoginForm.emit();
                this.router.navigate(['/dashboard']);
              }
            });
        }
    }
}
