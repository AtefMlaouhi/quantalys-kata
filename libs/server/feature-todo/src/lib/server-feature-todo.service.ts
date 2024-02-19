import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDoEntitySchema } from '@quantalys/server/data-access';
import { ITodo } from '@quantalys/shared/domain';
import { Repository } from 'typeorm';

@Injectable()
export class ServerFeatureTodoService {
  constructor(@InjectRepository(ToDoEntitySchema) private toDoRepository: Repository<ITodo>) { }

  async getAll(): Promise<ITodo[]> {
    return await this.toDoRepository.find();
  }

  async getOne(id: string): Promise<ITodo> {
    const toDo = await this.toDoRepository.findOneBy({
      id,
    });
    if (!toDo) {
      throw new NotFoundException(`To-do not found!`);
    }
    return toDo;
  }

  async create(toDo: Pick<ITodo, 'title' | 'description'>): Promise<ITodo> {
    const existing = await this.toDoRepository.findOneBy({
      title: toDo.title,
    });
    if (existing) {
      throw new BadRequestException(`To-do with title '${toDo.title}' exists!`);
    }

    const newTodo = await this.toDoRepository.save({
      ...toDo,
    });
    const result = await this.toDoRepository.findOneByOrFail({
      id: newTodo.id,
    });
    return result;
  }

  async put(id: string, data: Partial<Omit<ITodo, 'id'>>): Promise<ITodo> {
    const toDo = await this.toDoRepository.findOneBy({
      id,
    });
    if (!toDo) {
      throw new NotFoundException(`To-do found!`);
    }

    await this.toDoRepository.save({
      id,
      ...data,
    });
    const updated = await this.toDoRepository.findOneOrFail({
      where: { id },
    });
    return updated;
  }

  async update(id: string, data: ITodo): Promise<ITodo> {

    const todo = await this.toDoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`To-do not found!`);
    }
    await this.toDoRepository.save({
      ...data,
      id
    });

    const updated = await this.toDoRepository.findOneOrFail({
      where: { id: data.id },
    });

    return updated;
  }

  async delete(id: string): Promise<void> {
    const toDo = await this.toDoRepository.findOneBy({ id });
    if (!toDo) {
      throw new NotFoundException(`To-do not found!`);
    }
    await this.toDoRepository.remove(toDo);
    return;
  }
}
