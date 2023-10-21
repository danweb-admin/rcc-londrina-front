import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Paroquia } from '../../../../../shared/models/paroquia';
import { ParoquiaService } from '../../../../../shared/services/paroquia.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CustomPaginator } from '../../../../../shared/shared';
import { UsuariosDialogComponent } from '../dialog/usuarios-dialog.component';
import { User } from '../../../../../shared/models/user';
import { UsuarioService } from '../../../../../shared/services/usuario.service';

@Component({
  selector: 'app-usuarios-table',
  templateUrl: './usuarios-table.component.html',
  styleUrls: ['./usuarios-table.component.scss']
})
export class UsuariosTableComponent implements OnInit {
  
    closeResult = '';
    public displayedColumns: string[] = ['nome', 'email', 'grupoOracao', 'decanato', 'ativo'];
    public dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild('inputSearch') inputSearch: ElementRef;


    constructor(private modalService: NgbModal, 
        private usuarioService: UsuarioService) {
    }

    applyFilter(event: Event): void {
        const inputValue = this.inputSearch.nativeElement.value;
        const length = inputValue.length;

        if (length > 2) {
            const filterValue = (event.target as HTMLInputElement).value;
            this.loadUsers(filterValue);
        }
    }

    closeFilterInput(): void {
        this.inputSearch.nativeElement.value = '';
        this.loadUsers('');
      }

    public ngOnInit(): void {
        this.loadUsers('');
    }

    loadUsers(search){
        this.usuarioService.loadUsers(true, search).subscribe((resp: User[]) => {
            this.dataSource = new MatTableDataSource<User>();
            this.dataSource = new MatTableDataSource<User>(resp);            
            this.dataSource.paginator = this.paginator;       
         });

         if (this.paginator) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.paginator._intl = CustomPaginator();
          }
    }

    openDialog(item: User){
        const modalRef = this.modalService.open(UsuariosDialogComponent, {'size': 'lg'})
        modalRef.componentInstance.user = item;
        modalRef.result.then(res=>{
            this.loadUsers('');
        },dismiss=>{
        console.log("Cross Button",dismiss)
        })
    }
}