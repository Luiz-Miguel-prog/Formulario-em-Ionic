// home.page.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nome: string = '';
  cpf: string = '';
  email: string = '';
  telefone: string = '';
  cep: string = '';
  endereco: string = '';
  bairro: string = '';
  cidade: string = '';
  estado: string = '';

  constructor() {}

  buscarEndereco() {
    const cep = this.cep.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cep.length !== 8) {
      alert('CEP inválido. Por favor, digite um CEP válido com 8 dígitos.');
      return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (!data.erro) {
          this.endereco = data.logradouro;
          this.bairro = data.bairro;
          this.cidade = data.localidade;
          this.estado = data.uf;
        } else {
          alert('CEP não encontrado. Por favor, verifique o CEP digitado.');
        }
      })
      .catch(error => {
        console.error('Ocorreu um erro ao buscar o endereço:', error);
      });
  }

  cadastrarFuncionario() {
    const funcionario = {
      nome: this.nome,
      cpf: this.cpf,
      email: this.email,
      telefone: this.telefone,
      cep: this.cep,
      endereco: this.endereco,
      bairro: this.bairro,
      cidade: this.cidade,
      estado: this.estado,
    };

    const funcionarios = JSON.parse(localStorage.getItem('funcionarios') as string) || [];
    funcionarios.push(funcionario);

    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));

    alert('Funcionário cadastrado com sucesso!');

    // Limpar os campos do formulário
    this.nome = '';
    this.cpf = '';
    this.email = '';
    this.telefone = '';
    this.cep = '';
    this.endereco = '';
    this.bairro = '';
    this.cidade = '';
    this.estado = '';
  }
}
