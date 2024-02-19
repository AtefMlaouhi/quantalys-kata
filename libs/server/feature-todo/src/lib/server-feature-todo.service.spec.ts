import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randUuid, seed } from '@ngneat/falso';
import { ToDoEntitySchema } from '@quantalys/server/data-access';
import { MockType, repositoryMockFactory } from '@quantalys/server/util/testing';
import { ITodo } from '@quantalys/shared/domain';
import { createMockTodo } from '@quantalys/shared/util-testing';
import { QueryFailedError, Repository } from 'typeorm';
import { ServerFeatureTodoService } from './server-feature-todo.service';


describe('ServerFeatureTodoService', () => {
  let service: ServerFeatureTodoService;
  let repoMock: MockType<Repository<ITodo>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ServerFeatureTodoService,
        {
          provide: getRepositoryToken(ToDoEntitySchema),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get(ServerFeatureTodoService);
    repoMock = module.get(getRepositoryToken(ToDoEntitySchema));
  });

  beforeEach(() => {
    seed(Math.random().toString());
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of to-do', async () => {
    const toDos = Array.from({ length: 5 }).map(() =>
      createMockTodo()
    );
    repoMock.find?.mockReturnValue(toDos);
    expect((await service.getAll()).length).toBe(toDos.length);
    expect(repoMock.find).toHaveBeenCalled();
  });

  it('should return an a single toDo by ID', async () => {
    const toDos = Array.from({ length: 5 }).map(() =>
      createMockTodo()
    );
    repoMock.findOneBy?.mockReturnValue(toDos[0]);
    expect(await service.getOne(toDos[0].id)).toStrictEqual(
      toDos[0]
    );
    expect(repoMock.findOneBy).toHaveBeenCalledWith({
      id: toDos[0].id,
    });
  });

  it('should throw an exception when a toDo ID is not found', async () => {
    repoMock.findOneBy?.mockReturnValue(undefined);
    try {
      await service.getOne('foo');
    } catch (err) {
      expect(err instanceof NotFoundException).toBe(true);
      expect(repoMock.findOneBy).toHaveBeenCalledWith({
        id: 'foo'
      });
    }
  });

  it('should create a toDo', async () => {
    const toDo = createMockTodo();
    repoMock.findOneBy?.mockReturnValue(null);
    repoMock.findOneByOrFail?.mockReturnValue(toDo);
    repoMock.save?.mockReturnValue(toDo);
    expect(await service.create(toDo)).toStrictEqual(toDo);
    expect(repoMock.save).toHaveBeenCalledWith({
      ...toDo,
    });
  });

  it('should catch an error if a duplicate title is detected', async () => {
    const toDo = createMockTodo();
    repoMock.save?.mockImplementation(() => {
      const err = new QueryFailedError('unique constraint failed', [], {});
      err.message =
        'ERROR SQLITE_CONSTRAINT: UNIQUE constraint failed: toDo.title';
      throw err;
    });
    try {
      await service.create(toDo);
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
    }
  });

  it('should update a toDo', async () => {
    const toDo = createMockTodo();
    const newTitle = 'foo';
    repoMock.findOneOrFail?.mockReturnValue({ ...toDo, title: newTitle });
    const res = await service.update(toDo.id, { title: newTitle } as ITodo);
    expect(res.title).toBe(newTitle);
    expect(repoMock.save).toHaveBeenCalledWith({
      id: toDo.id,
      title: newTitle,
    });
    expect(repoMock.findOneOrFail).toHaveBeenCalled();
  });

  it("should not update a toDo that doesn't exist", async () => {
    repoMock.findOneBy?.mockReturnValue(null);
    try {
      await service.update('', {} as ITodo);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });

  it('should upsert a new toDo', async () => {
    const toDo = createMockTodo();
    const newTitle = 'foo';
    repoMock.findOne?.mockReturnValue(null);
    repoMock.findOneOrFail?.mockReturnValue({ ...toDo, title: newTitle });
    const res = await service.update(toDo.id, toDo);
    expect(res.title).toBe(newTitle);
    expect(repoMock.save).toHaveBeenCalledWith({
      ...toDo
    });
    expect(repoMock.findOneOrFail).toHaveBeenCalled();
  });

  it('should not allow ID to change during an put', async () => {
    const toDo = createMockTodo();
    repoMock.findOne?.mockReturnValue(toDo);
    try {
      await service.update(toDo.id, { ...toDo, id: randUuid() });
    } catch (err) {
      console.log(err);
      expect(err).toBeInstanceOf(BadRequestException);
    }
  });

  it('should update and return the updated to-do item', async () => {
    const id = '1';
    const data = { title: 'Updated Title' };
    const existingToDo = createMockTodo();
    repoMock.findOneBy?.mockReturnValue(existingToDo);
    repoMock.save?.mockReturnValue({ id, ...data });
    repoMock.findOneOrFail?.mockReturnValue({ id, ...data });
    const result = await service.put(id, data);
    expect(repoMock.findOneBy).toHaveBeenCalledWith({ id });
    expect(repoMock.save).toHaveBeenCalledWith({ id, ...data });
    expect(repoMock.findOneOrFail).toHaveBeenCalledWith({ where: { id } });
    expect(result).toEqual({ id, ...data });
  });

  it('should throw NotFoundException if to-do item does not exist', async () => {
    const id = '1';
    const data = { title: 'Updated Title' };
    repoMock.findOneBy?.mockReturnValue(null);
    try {
      await service.put(id, data);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });

  it('should delete a toDo', async () => {
    const toDo = createMockTodo();
    repoMock.findOneBy?.mockReturnValue(toDo);
    repoMock.remove?.mockReturnValue(toDo);
    expect(await service.delete(toDo.id)).toBeUndefined();
    expect(repoMock.remove).toHaveBeenCalledWith(toDo);
  });

  it("should not delete a toDo that doesn't exist", async () => {
    repoMock.findOneBy?.mockReturnValue(null);
    try {
      await service.delete('');
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });
});
