
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { ITodo } from '@quantalys/shared/domain';

describe('Service: Todo', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    });

    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return todos', () => {
    const mockTodos: ITodo[] = [
      { id: '1', title: 'Todo 1', completed: false },
      { id: '2', title: 'Todo 2', completed: true }
    ];

    service.get().then(todos => {
      expect(todos).toEqual(mockTodos);
    });

    const req = httpMock.expectOne('/api/v1/todos');
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);
  });
});
