import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Paroquia } from '../../../../../shared/models/paroquia';
import { ParoquiaService } from '../../../../../shared/services/paroquia.service';
import { ParoquiasDialogComponent } from '../dialog/paroquias-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CustomPaginator } from '../../../../../shared/shared';

@Component({
  selector: 'app-paroquias-table',
  templateUrl: './paroquias-table.component.html',
  styleUrls: ['./paroquias-table.component.scss']
})
export class ParoquiasTableComponent implements OnInit {
  
    closeResult = '';
    public displayedColumns: string[] = ['nome', 'cidade', 'bairro', 'decanato', 'ativo'];
    public dataSource: MatTableDataSource<Paroquia> = new MatTableDataSource<Paroquia>();
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild('inputSearch') inputSearch: ElementRef;


    constructor(private modalService: NgbModal, 
        private paroquiaService: ParoquiaService) {
    }

    applyFilter(event: Event): void {
        const inputValue = this.inputSearch.nativeElement.value;
        const length = inputValue.length;

        if (length > 2) {
            const filterValue = (event.target as HTMLInputElement).value;
            this.loadParoquias(filterValue);
        }
    }

    closeFilterInput(): void {
        this.inputSearch.nativeElement.value = '';
        this.loadParoquias('');
      }

    public ngOnInit(): void {
        this.loadParoquias('');
    }

    loadParoquias(search){
        this.paroquiaService.loadParoquias(true, search).subscribe((resp: Paroquia[]) => {
            this.dataSource = new MatTableDataSource<Paroquia>();
            this.dataSource = new MatTableDataSource<Paroquia>(resp);
            this.dataSource.paginator = this.paginator;       
         });

         if (this.paginator) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.paginator._intl = CustomPaginator();
          }
    }

    openDialog(item: Paroquia){
        const modalRef = this.modalService.open(ParoquiasDialogComponent, {'size': 'lg'})
        modalRef.componentInstance.paroquia = item;
        modalRef.result.then(res=>{
            this.loadParoquias('');
        },dismiss=>{
        console.log("Cross Button",dismiss)
        })
    }
}