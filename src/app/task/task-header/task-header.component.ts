import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHeaderComponent implements OnInit {

  @Input() header = '';
  @Output() newTask = new EventEmitter<void>();
  @Output() moveAllTask = new EventEmitter<void>();
  @Output() DeleteList = new EventEmitter<void>();
  @Output() EditList = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onNewTaskClick() {
    this.newTask.emit();
  }

  onMoveAllClick() {
    this.moveAllTask.emit();
  }

  onDeleteListClick() {
    this.DeleteList.emit();
  }

  onEditListClick() {
    this.EditList.emit();
  }



}
