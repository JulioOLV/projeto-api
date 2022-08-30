import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutosService {
  produtos: Produto[] = [
    new Produto("LIV01", "Livro 01", 10.00),
    new Produto("LIV02", "Livro 02", 20.00),
    new Produto("LIV03", "Livro 03", 30.00),
  ];

  create(createProdutoDto: CreateProdutoDto) {
    const novoProduto = new Produto(createProdutoDto.codigo, createProdutoDto.nome, createProdutoDto.preco);
    novoProduto.id = this.produtos.length + 1;
    return this.produtos.push(novoProduto);
  }

  findAll() : Produto[] {
    return this.produtos;
  }

  findOne(id: number) : Produto {
    return this.produtos[id--];
  }

  update(id: number, updateProdutoDto: UpdateProdutoDto) : Produto {
    this.produtos.forEach(x => {
      if (x.id === id) {
        x.codigo = updateProdutoDto.codigo;
        x.nome = updateProdutoDto.nome;
        x.preco = updateProdutoDto.preco;
      }
    });

    return this.produtos[id--];
  }

  remove(id: number) {
    this.produtos = this.produtos.filter(x => x.id !== id);
  }
}
