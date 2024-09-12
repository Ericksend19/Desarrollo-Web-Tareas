import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './model/producto.entity';
import { Repository } from 'typeorm';

import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {constructor(
    @InjectRepository(Producto) 
    private productoRepository: Repository<Producto>
  ) {}
  //para mostrar todos los productos 
  async findAll() {
    return this.productoRepository.find();
  }

  //para buscar producto con x su id
  async findById(id: string) {
    const producto = await this.productoRepository.findOne({ where: { id } });
    if (!producto) {
      throw new HttpException(`Producto No. ${id} no existe.`, 404);
    }
    return producto;
  }

  //es para crear un nuevo producto 

  async createProducto(producto: CreateProductoDto){
    const existingProducto = await this.productoRepository.findOne({
      where: { nombre: producto.nombre },
    });
    if (existingProducto) {
      throw new HttpException(`Producto ${producto.nombre} ya existe.`, 409);
    }
    
    const newProducto = this.productoRepository.create(producto);
    return this.productoRepository.save(newProducto);
  }

  //es para actualizar un producto 

  async updateProducto(id: string, producto: UpdateProductoDto) {
    const existingProducto = await this.findById(id); 

    Object.assign(existingProducto, producto);
    return this.productoRepository.save(existingProducto);
  }

  //para eliminar producto 

  async deleteProducto(id: string){
    const producto = await this.findById(id); 
    await this.productoRepository.remove(producto);
  }

}
