import { Module } from '@nestjs/common';
import { ServerDataAccessTodoModule } from '@quantalys/server/data-access';
import { ServerFeatureTodoController } from './server-feature-todo.controller'; // Fixed import statement
import { ServerFeatureTodoService } from './server-feature-todo.service';

@Module({
  imports: [ServerDataAccessTodoModule],
  controllers: [ServerFeatureTodoController],
  providers: [ServerFeatureTodoService],
  exports: [ServerFeatureTodoService],
})
export class ServerFeatureTodoModule { }
