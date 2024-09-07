import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HousesModule } from './houses/houses.module';
import { VisitantModule } from './visitant/visitant.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-crb4v32j1k6c73cn5j5g-a.ohio-postgres.render.com',
      port: 5432,
      username: 'conso_app_db_user',
      password: 'mO9owPpxv6PWKPVuDp239QXJfSs3vKPt',
      database: 'conso_app_db',
      ssl: true,
      autoLoadEntities: true,
      synchronize: true, // Remove this for prod
      //logging: true
    }),
    UsersModule,
    HousesModule,
    VisitantModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
