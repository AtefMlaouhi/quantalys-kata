import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TodoService } from '@quantalys-todo/client/data-access';
import { ToDoComponent } from '@quantalys/client/ui-components/to-do';
import { ITodo } from '@quantalys/shared/domain';
@Component({
  selector: 'quantalys-feature-todo-list',
  standalone: true,
  imports: [NgFor, HttpClientModule, ToDoComponent],
  providers: [TodoService],
  templateUrl: './feature-todo-list.component.html',
  styleUrls: ['./feature-todo-list.component.scss'],
})
export class FeatureTodoListComponent implements OnInit {
  todos: ITodo[] | undefined = [];

  constructor(private todoService: TodoService) { }

  async ngOnInit(): Promise<void> {
    this.todos = await this.todoService.get();
  }


}
