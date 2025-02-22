import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDTO } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(@Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy) { }

  @Post()
  createProduct() {
    return 'Create a product';
  }

  @Get()
  findAllProducts(@Query() paginationDTO: PaginationDTO) {
    return this.productsClient.send({ cmd: 'find_all_products' }, paginationDTO);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Get product with id: ${id}`;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return `Delete product with id: ${id}`;
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() body: any) {
    return `Update product with id: ${id}`;
  }

}
