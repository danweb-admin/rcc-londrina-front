
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

import {
  FormularioServoService,
  CadastroServoFormulario
} from '../../services/formulario-servo.service';
import { ToastrService } from 'ngx-toastr';
import { ValidateService } from '../../shared/services/validate-service';

@Component({
  selector: 'app-cadastro-servo-publico',
  templateUrl: './cadastro-servo-publico.component.html',
  styleUrls: ['./cadastro-servo-publico.component.scss']
})
export class CadastroServoPublicoComponent implements OnInit {
  token = '';
  grupoOracao = '';
  paroquia = '';
  decanato = '';
  carregando = true;
  enviando = false;
  enviado = false;
  erro = '';
  idade: number | null = null;
  
  form = this.fb.group({
    name: ['', Validators.required],
    birthday: ['', Validators.required],
    cpf: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    cellPhone: ['', Validators.required],
    mainMinistry: ['', Validators.required],
    secondaryMinistry: [''],
    aceitouConsentimento: [false, Validators.requiredTrue],
    
    // Novos campos do responsável:
    responsavelNome: [''],
    responsavelTelefone: [''],
    responsavelCpf: ['']
  });
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: FormularioServoService,
    private toastr: ToastrService,
    private validateService: ValidateService,
  ) {}
  
  ngOnInit(): void {
    this.form.get('birthday')?.valueChanges.subscribe((dataNascimento: string) => {
      this.idade = this.calcularIdade(dataNascimento);
      this.atualizarValidacaoResponsavel();
    });
    this.token = this.route.snapshot.paramMap.get('token') || '';
    
    if (!this.token) {
      this.erro = 'Link de cadastro inválido.';
      this.carregando = false;
      return;
    }
    
    this.service.getFormulario(this.token)
    .pipe(finalize(() => this.carregando = false))
    .subscribe({
      next: (res) => {
        this.grupoOracao = res.grupoOracao.name;
        this.paroquia = res.grupoOracao.paroquiaCapela.name;
        this.decanato = res.grupoOracao.paroquiaCapela.decanatoSetor.name;
        
        console.log(res);
        
      },
      error: () => {
        this.erro = 'Formulário não encontrado ou inativo.';
      }
    });
  }
  
  
  enviar(): void {
    this.erro = '';
    let cpf = this.form.value.cpf;

    if (!this.validateService.validarCpf(cpf)){
        this.toastr.warning("CPF Inválido.")
        return;
      }
    
    if (this.enviando) {
      return;
    }
    
    if (!this.form.get('aceitouConsentimento')?.value) {
      this.erro = 'É necessário aceitar o termo de consentimento para realizar o cadastro.';
      this.form.get('aceitouConsentimento')?.markAsTouched();
      return;
    }
    
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.erro = 'Preencha todos os campos obrigatórios.';
      return;
    }
    
    const cadastro = this.form.getRawValue() as CadastroServoFormulario;
    
    this.enviando = true;
    
    this.service.cadastrar(this.token, cadastro)
    .pipe(finalize(() => this.enviando = false))
    .subscribe({
      next: () => {
        this.enviado = true;
      },
      error: (err) => {
        this.erro = err?.error?.message ||
        'Não foi possível enviar o cadastro.';
      }
    });
  }
  
  
  
  private calcularIdade(dataNascimento: string): number | null {
    if (!dataNascimento) {
      return null;
    }
    
    // Evita diferenças de fuso horário ao interpretar yyyy-MM-dd.
    const partes = dataNascimento.split('-').map(Number);
    
    if (partes.length !== 3) {
      return null;
    }
    
    const [ano, mes, dia] = partes;
    const nascimento = new Date(ano, mes - 1, dia);
    
    if (
      nascimento.getFullYear() !== ano ||
      nascimento.getMonth() !== mes - 1 ||
      nascimento.getDate() !== dia
    ) {
      return null;
    }
    
    const hoje = new Date();
    
    if (nascimento > hoje) {
      return null;
    }
    
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    
    const aindaNaoFezAniversario =
    hoje.getMonth() < nascimento.getMonth() ||
    (hoje.getMonth() === nascimento.getMonth() &&
    hoje.getDate() < nascimento.getDate());
    
    if (aindaNaoFezAniversario) {
      idade--;
    }
    
    return idade;
  }
  
  private atualizarValidacaoResponsavel(): void {
    const campos = [
      'responsavelNome',
      'responsavelTelefone',
      'responsavelCpf'
    ];
    
    const exigeResponsavel = this.idade !== null && this.idade < 16;
    
    campos.forEach(nome => {
      const controle = this.form.get(nome);
      
      if (!controle) {
        return;
      }
      
      if (exigeResponsavel) {
        controle.setValidators([Validators.required]);
      } else {
        controle.clearValidators();
        controle.setValue('', { emitEvent: false });
      }
      
      controle.updateValueAndValidity({ emitEvent: false });
    });
  }
  
}
