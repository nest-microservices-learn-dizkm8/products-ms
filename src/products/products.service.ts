import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(ProductsService.name);

  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the database');
  }

  async create(createProductDto: CreateProductDto) {
    const product = await this.product.create({
      data: createProductDto,
    });
    return product;
  }

  async findAll(pagination: PaginationDto) {
    const { page, limit } = pagination;

    const totalPages = Math.ceil((await this.product.count()) / limit);

    const products = await this.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: products,
      total: totalPages,
      page,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return updateProductDto;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
