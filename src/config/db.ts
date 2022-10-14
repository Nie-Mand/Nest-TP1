import { TypeOrmModule } from '@nestjs/typeorm';

export const DatabaseModule = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'todo',
  entities: [__dirname + '/../models/*.model.ts'],
  synchronize: true,
});
