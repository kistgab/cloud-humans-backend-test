import { ProRoutes } from '@/infrastructure/api/routes/pro.routes';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ProRoutes],
  providers: [],
})
export class AppModule {}
