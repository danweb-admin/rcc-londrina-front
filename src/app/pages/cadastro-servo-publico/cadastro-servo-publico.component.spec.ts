import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroServoPublicoComponent } from './cadastro-servo-publico.component';

describe('CadastroServoPublicoComponent', () => {
  let component: CadastroServoPublicoComponent;
  let fixture: ComponentFixture<CadastroServoPublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroServoPublicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroServoPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
