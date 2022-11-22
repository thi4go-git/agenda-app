import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContatoInfoComponent } from '../contato-info/contato-info.component';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  contato: Contato;
  formulario: FormGroup;
  contatos: Contato[] = [];
  colunas = ['foto', 'id', 'nome', 'email', 'favorito'];

  totalElementos = 0;
  pagina;
  tamanho;
  pageSizeOptions: number[] = [10];


  constructor(
    private service: ContatoService,
    private formBuild: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  onSubmit() {
    this.salvar();
  }


  salvar() {
    const formValues = this.formulario.value;
    let contato: Contato = new Contato(formValues.nome, formValues.email);

    this.service.salvar(contato)
      .subscribe(resposta => {
        this.listarContatos(this.pagina, this.tamanho);
        this.snackBar.open("Contato Salvo com sucesso!", "Sucesso!", {
          duration: 3000
        })
        this.formulario.reset();
      }, erroResposta => {
        console.log("Erro salvar: " + erroResposta);
      });
  }


  favoritar(contato: Contato) {
    this.service.favoritar(contato.id)
      .subscribe(resposta => {
        console.log("Favoritado: ");
        contato.favorito = !contato.favorito;
      });
  }


  ngOnInit(): void {
    this.montarFormulario();
    this.listarContatos(this.pagina, this.tamanho);
  }

  montarFormulario() {
    this.formulario = this.formBuild.group({
      nome: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]]
    })
  }

  listarContatos(pagina = 0, tamanho = 10) {
    this.service.listar(pagina, tamanho)
      .subscribe(response => {
        this.contatos = response.content;
        this.totalElementos = response.totalElements;
        this.pagina = response.number;
      }, responseErro => {
        console.log("Erro ao listar: " + responseErro);
      });
  }

  uploadFoto(event, contato) {
    const files = event.target.files;
    console.log(files);

    if (files) {
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append("foto", foto);
      //
      this.service.uploadFoto(contato.id, formData)
        .subscribe(response => {
          this.listarContatos(this.pagina, this.tamanho);
        });
    }
  }

  infoContato(contato: Contato) {
    this.dialog.open(ContatoInfoComponent, {
      width: '400px', height: '450px',
      data: contato
    });
  }

  paginar(event: PageEvent) {
    this.pagina = event.pageIndex;
    this.listarContatos(this.pagina, this.tamanho);
  }

}
