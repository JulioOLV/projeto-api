import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { Livro } from './models/livro.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Livro])],
  controllers: [ProdutosController],
  providers: [ProdutosService],
})
export class ProdutosModule {}
