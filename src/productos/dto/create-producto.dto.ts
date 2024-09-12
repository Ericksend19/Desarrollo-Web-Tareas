import { IsNotEmpty, IsString, MinLength, IsNumber, Min, IsOptional, MaxLength } from 'class-validator';

export class CreateProductoDto {

  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  @MaxLength(50, { message: 'El nombre no debe exceder los 50 caracteres.' })
  nombre: string;

  @IsOptional()
  @IsString()
  @MaxLength(200, { message: 'La descripción no debe exceder los 200 caracteres.' })
  descripcion?: string;

  @IsNumber()
  @Min(0.01, { message: 'El precio debe ser mayor que 0.' })
  precio: number;

  @IsNumber()
  @Min(0, { message: 'El stock debe ser mayor o igual a 0.' })
  stock: number;
}