import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';
import { Livro } from './models/livro.model';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectModel(Livro)
    private livroModel: typeof Livro,
  ) {}

  create(createProdutoDto: CreateProdutoDto) {
    const novoProduto = new Produto(
      createProdutoDto.codigo,
      createProdutoDto.nome,
      createProdutoDto.preco,
    );
    const novoLivro = {
      codigo: novoProduto.codigo,
      nome: novoProduto.nome,
      preco: novoProduto.preco,
    };
    return this.livroModel.create(novoLivro);
  }

  async findAll(): Promise<Livro[]> {
    return this.livroModel.findAll();
  }

  async findOne(id: number): Promise<Livro> {
    return this.livroModel.findByPk(id);
  }

  async update(
    id: number,
    updateProdutoDto: UpdateProdutoDto,
  ): Promise<[number]> {
    const livro = {
      codigo: updateProdutoDto.codigo,
      nome: updateProdutoDto.nome,
      preco: updateProdutoDto.preco,
    };
    return this.livroModel.update(livro, { where: { id } });
  }

  async remove(id: number) {
    const livro = await this.findOne(id);
    livro.destroy();
  }
}
