import { randSentence } from '@ngneat/falso';
import axios from 'axios';

interface IDummyTodoResponse {
  todos: Array<{
    todo: string;
  }>;
  total: number;
  skip: string;
  limit: number;
}

axios
  .get<IDummyTodoResponse>(`https://dummyjson.com/toDos?limit=100&skip=20`)
  .then(({ data }) => {
    return data.todos.map((t) => ({
      title: t.todo,
      description: randSentence(),
    }));
  })
  .then(async (newTodos) => {
    for (const toDo of newTodos) {
      await axios
        .post(`http://localhost:3333/api/v1/todos`, toDo)
        .then((resp) => {
          console.log(resp.data);
        });
    }
  });
