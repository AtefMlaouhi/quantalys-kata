import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITodo } from '@quantalys/shared/domain';

@Injectable({ providedIn: 'root'})
export class TodoService {

  constructor(private http: HttpClient) { }

  get(): Promise<ITodo[] | undefined> {
    return this.http.get<ITodo[]>('/api/v1/todos').toPromise();
  }
}
