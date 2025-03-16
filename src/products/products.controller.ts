import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDTO } from 'src/common';
import { NATS_SERVICE, PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      return this.client.send({ cmd: 'create_product' }, createProductDto);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  findAllProducts(@Query() paginationDTO: PaginationDTO) {
    return this.client.send({ cmd: 'find_all_products' }, paginationDTO);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {

    return this.client.send({ cmd: 'find_one_product' }, { id })
      .pipe(
        catchError(err => {
          throw new RpcException(err);
        })
      )
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.client.send({ cmd: 'delete_product' }, { id });
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto) {
    try {
      return this.client.send({ cmd: 'update_product' }, { id, ...updateProductDto });
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
