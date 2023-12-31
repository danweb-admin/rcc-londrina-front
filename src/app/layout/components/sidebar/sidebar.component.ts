import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UsuarioService } from '../../../shared/services/usuario.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive: boolean;
    collapsed = true;
    showMenu: string;
    pushRightClass: string;
    isAdmin: string;

    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(public router: Router,
                private userService: UsuarioService) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });

    }

    ngOnInit() {
        this.isActive = false;
        this.collapsed = true;
        this.showMenu = '';
        this.pushRightClass = 'push-right';
        this.toggleCollapsed();
        this.isAdmin = localStorage.getItem('admin') ;
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
}
