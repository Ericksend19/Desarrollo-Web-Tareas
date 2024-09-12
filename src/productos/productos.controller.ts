import { Controller, Post, Body, Get, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import {ProductosService} from './productos.service'
import {CreateProductoDto,UpdateProductoDto } from './dto'
import {Producto} from './model/producto.entity'

@Controller('productos')
export class ProductosController {
    constructor(private productosService: ProductosService) {}

  @Get()
  async getProductos() {
    return this.productosService.findAll();
  }

  @Get(':id')
  async getProducto(@Param('id') id: string){
    const producto = await this.productosService.findById(id);
    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado.`);
    }
    return producto;
  }

  @Post()
  async createProducto(@Body() newProducto: CreateProductoDto) {
    return this.productosService.createProducto(newProducto);
  }

  @Delete(':id')
  async deleteProducto(@Param('id') id: string) {
    await this.productosService.deleteProducto(id);
  }

  @Put(':id')
  async updateProducto(
    @Param('id') id: string,
    @Body() producto: UpdateProductoDto
  ){
    const updatedProducto = await this.productosService.updateProducto(id, producto);
    if (!updatedProducto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado.`);
    }
    return updatedProducto;
  }
}
