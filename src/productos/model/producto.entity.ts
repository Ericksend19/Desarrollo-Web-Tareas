import { Entity,PrimaryGeneratedColumn,Column,CreateDateColumn } from "typeorm";
import {IsNotEmpty, MinLength,IsNumber,Min,IsDateString}from 'class-validator';
import {v4 as uuidv4}from'uuid';

@Entity({name : 'productos'})
export class Producto {

    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column({length:100})
    @IsNotEmpty()
    @MinLength(3)
    nombre: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @Column('decimal', { precision: 10, scale: 2 })
    @IsNotEmpty()
    @IsNumber()
    @Min(0.01)
    precio: number;

    @Column('int')
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    stock: number;

    @CreateDateColumn({ type: 'timestamp' })
    @IsDateString()
    fechaCreacion: Date;

    constructor() {
        this.id = uuidv4();
    }
}