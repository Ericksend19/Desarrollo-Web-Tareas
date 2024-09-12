import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host: 'localhost',
      username: 'root',
      password: '123456',
      database: 'tareas_web',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    })
    ,ProductosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
