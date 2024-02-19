import { randBoolean, randProduct } from '@ngneat/falso';
import { ITodo } from '@quantalys/shared/domain';

export const createMockTodo = (
  data?: Partial<ITodo>
): ITodo => {
  const { id, title, description } = randProduct();

  return {
    id,
    title,
    description,
    completed: randBoolean(),
    ...data,
  };
};
