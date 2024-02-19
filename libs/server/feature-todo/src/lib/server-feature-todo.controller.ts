import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import {
  CreateTodoDto,
  ErrorResponseDto,
  TodoDto,
  UpdateTodoDto,
  UpsertTodoDto,
} from '@quantalys/server/data-access';
import { ITodo } from '@quantalys/shared/domain';
import { ServerFeatureTodoService } from './server-feature-todo.service';

@Controller({ path: 'todos', version: '1' })
@ApiTags('Todos')
export class ServerFeatureTodoController {
  constructor(private serverFeatureTodoService: ServerFeatureTodoService) { }

  @Get('')
  @ApiOkResponse({
    type: TodoDto,
    isArray: true,
  })
  @ApiOperation({
    summary: 'Returns all to-do',
    tags: ['todos'],
  })
  async getAll(): Promise<ITodo[]> {
    return this.serverFeatureTodoService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: TodoDto,
  })
  @ApiOperation({
    summary: 'Returns to-do',
    tags: ['todos'],
  })
  async getOne(@Param('id') id: string): Promise<ITodo> {
    return this.serverFeatureTodoService.getOne(id);
  }

  @Post('')
  @ApiCreatedResponse({
    type: TodoDto,
  })
  @ApiBadRequestResponse({
    type: ErrorResponseDto,
  })
  @ApiOperation({
    summary: 'Creates to-do',
    tags: ['todos'],
  })
  async create(@Body() data: CreateTodoDto): Promise<ITodo> {
    return this.serverFeatureTodoService.create(data);
  }

  @Put(':id')
  @ApiOkResponse({
    type: TodoDto,
  })
  @ApiCreatedResponse({
    type: TodoDto,
  })
  @ApiOperation({
    summary: 'Replaces all values in to-do',
    tags: ['todos'],
  })
  async upsertOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpsertTodoDto
  ): Promise<ITodo> {
    return this.serverFeatureTodoService.put(id, data);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: TodoDto,
  })
  @ApiOperation({
    summary: 'Partially updates a single to-do',
    tags: ['todos'],
  })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateTodoDto
  ): Promise<ITodo> {
    return this.serverFeatureTodoService.update(id, data as ITodo);
  }

  @Delete(':id')
  @ApiNoContentResponse({
    type: undefined,
  })
  @ApiOperation({
    summary: 'Deletes a specific to-do item',
    tags: ['todos'],
  })
  @HttpCode(204)
  async delete(
    @Param('id') id: string
  ): Promise<void> {
    return this.serverFeatureTodoService.delete(id);
  }
}
