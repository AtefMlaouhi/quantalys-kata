import { ApiProperty } from '@nestjs/swagger';
import {
  ICreateTodo,
  ITodo,
  IUpdateTodo,
  IUpsertTodo
} from '@quantalys/shared/domain';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TodoDto implements ITodo {
  @ApiProperty({
    type: String,
    example: `Create to-do`,
    readOnly: true,
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    type: String,
    example: `Kata quantalys`,
    readOnly: true,
  })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({
    type: String,
    readOnly: true,
    example: 'DCA76BCC-F6CD-4211-A9F5-CD4E24381EC8',
  })
  @IsString()
  @IsNotEmpty()
  id!: string;

  @ApiProperty({
    type: Boolean,
    readOnly: true,
    default: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  completed!: boolean;
}

export class CreateTodoDto implements ICreateTodo {
  @ApiProperty({
    type: String,
    example: `Create to-do`,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    type: String,
    example: `Kata quantalys`,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description!: string;
}

export class UpsertTodoDto implements IUpsertTodo {
  @ApiProperty({
    type: String,
    example: `Create to-do`,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    type: String,
    example: `Kata quantalys`,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  id!: string;

  @ApiProperty({
    type: Boolean,
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  completed!: boolean;
}

export class UpdateTodoDto implements IUpdateTodo {
  @ApiProperty({
    type: String,
    example: `Kata quantalys`,
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    type: String,
    example: `Kata quantalys`,
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: Boolean,
    required: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
