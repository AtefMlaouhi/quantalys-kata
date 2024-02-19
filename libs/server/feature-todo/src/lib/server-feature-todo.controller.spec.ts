import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ToDoEntitySchema, UpsertTodoDto } from '@quantalys/server/data-access';
import { repositoryMockFactory } from '@quantalys/server/util/testing';
import { createMockTodo } from '@quantalys/shared/util-testing';
import { ServerFeatureTodoController } from './server-feature-todo.controller';
import { ServerFeatureTodoService } from './server-feature-todo.service';

describe('ServerFeatureTodoController', () => {
  let controller: ServerFeatureTodoController;
  let service: ServerFeatureTodoService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ServerFeatureTodoService,
        {
          provide: getRepositoryToken(ToDoEntitySchema),
          useFactory: repositoryMockFactory,
        },
      ],
      controllers: [ServerFeatureTodoController],
    }).compile();

    controller = module.get(ServerFeatureTodoController);
    service = module.get(ServerFeatureTodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });

  it('should return an array of to-do items', async () => {
    jest
      .spyOn(service, 'getAll')
      .mockReturnValue(
        Promise.resolve(
          Array.from({ length: 5 }).map(() => createMockTodo())
        )
      );

    const res = await controller.getAll();
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBe(5);
  });

  it('should return a single toDo by ID', async () => {
    const toDo = createMockTodo();
    jest.spyOn(service, 'getOne').mockReturnValue(Promise.resolve(toDo));
    expect(await controller.getOne(toDo.id)).toStrictEqual(toDo);
  });

  it('should be able to create a new toDo', async () => {
    const toDo = createMockTodo();
    jest.spyOn(service, 'create').mockReturnValue(Promise.resolve(toDo));
    const res = await controller.create({ ...(toDo as UpsertTodoDto) });
    expect(res).toStrictEqual(toDo);
  });

  it('should allow upserting a new toDo', async () => {
    const toDo = createMockTodo();
    jest.spyOn(service, 'put').mockReturnValue(Promise.resolve(toDo));
    const res = await controller.upsertOne(toDo.id, (toDo as UpsertTodoDto));
    expect(res).toStrictEqual(toDo);
  });

  it('should allow updates to a single toDo', async () => {
    const toDo = createMockTodo();
    const newTitle = 'newTitle';
    jest
      .spyOn(service, 'update')
      .mockReturnValue(Promise.resolve({ ...toDo, title: newTitle }));
    const updated = await controller.update(toDo.id, {
      title: newTitle,
    });
    expect(updated.title).toBe(newTitle);
  });

  it('should delete a toDo', async () => {
    jest.spyOn(service, 'delete').mockReturnValue(Promise.resolve());
    expect(await controller.delete('')).toBe(undefined);
  });
});
