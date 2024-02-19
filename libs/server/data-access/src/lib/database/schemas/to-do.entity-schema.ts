import { ITodo } from '@quantalys/shared/domain';
import { EntitySchema } from 'typeorm';

export const ToDoEntitySchema = new EntitySchema<ITodo>({
  name: 'toDo',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
      unique: true,
      update: false,
    },
    title: {
      type: String,
      nullable: false,
    },
    description: {
      type: String,
      nullable: true,
    },
    completed: {
      type: 'boolean',
      default: false,
      nullable: false,
    },
  }
});
