import { JsonPipe } from '@angular/common';
import { SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToDoComponent } from './to-do.component';

describe('ToDoComponent', () => {
  let component: ToDoComponent;
  let fixture: ComponentFixture<ToDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoComponent],
      providers: [JsonPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log the toDo on initialization', () => {
    jest.spyOn(console, 'log');
    component.toDo = { id: '1', title: 'Test Todo', completed: false };
    component.ngOnInit();
    expect(console.log).toHaveBeenCalledWith('toDo', component.toDo);
  });

  it('should log the changes on ngOnChanges', () => {
    jest.spyOn(console, 'log');
    const changes: SimpleChanges = {
      toDo: {
        currentValue: { id: 1, title: 'Test Todo', completed: false },
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true,
      },
    };
    component.ngOnChanges(changes);
    expect(console.log).toHaveBeenCalledWith('changes', changes);
  });
});
