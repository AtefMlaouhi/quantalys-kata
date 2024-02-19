import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { ITodo } from '@quantalys/shared/domain';


@Component({
  selector: 'quantalys-todo',
  standalone: true,
  imports: [
    JsonPipe,
  ],
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoComponent implements OnInit, OnChanges {

  @Input() toDo: ITodo | undefined;

  ngOnInit(): void {
    console.log('toDo', this.toDo);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
  }
}
