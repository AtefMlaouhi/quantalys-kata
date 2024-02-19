import { randSentence } from '@ngneat/falso';
import axios from 'axios';

interface IDummyTodoResponse {
  toDos: Array<{
    id: number;
    toDo: string;
    completed: boolean;
    userId: number;
  }>;
  total: number;
  skip: string;
  limit: number;
}

axios
  .get<IDummyTodoResponse>(`https://dummyjson.com/toDos?limit=10&skip=20`)
  .then(({ data }) => {
    return data.toDos.map((t) => ({
      title: t.toDo,
      completed: t.completed,
      description: randSentence(),
    }));
  })
  .then(async (newTodos) => {
    for (const toDo of newTodos) {
      await axios
        .post(`http://localhost:3333/api/v1/toDos`, toDo)
        .then((resp) => {
          console.log(resp.data);
        });
    }
  });
