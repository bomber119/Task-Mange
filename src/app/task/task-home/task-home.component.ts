import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import { routeAnimation } from '../../animations/router.animation';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [routeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHomeComponent implements OnInit {

  @HostBinding('@routeAnimation') state;

  lists = [
    {
      id: 1,
      name: '待办',
      order: 1,
      tasks: [
        {
          id: 1,
          desc: '任务一：AAAAAAAA',
          completed: true,
          priority: 1,
          owner: {id: 1, name: '张三', avatar: 'avatars:svg-11'},
          dueDate: new Date(),
          reminder: true,
        },
        {
          id: 2,
          desc: '任务二：AAAAAAAA',
          completed: true,
          priority: 2,
          owner: {id: 2, name: '李四', avatar: 'avatars:svg-13'},
          dueDate: new Date(),
          reminder: false,
        },
        {
          id: 3,
          desc: '任务三：AAAAAAAA',
          completed: false,
          priority: 3,
          owner: {id: 3, name: '王五', avatar: 'avatars:svg-13'},
          dueDate: new Date(),
          reminder: false,
        },
      ]
    },
    {
      id: 2,
      name: '进行中',
      order: 2,
      tasks: [
        {
          id: 4,
          desc: '任务四：AAAAAAAA',
          completed: false,
          priority: 2,
          owner: {id: 1, name: '张三', avatar: 'avatars:svg-11'},
          dueDate: new Date(),
          reminder: false,
        },
        {
          id: 5,
          desc: '任务五：AAAAAAAA',
          completed: false,
          priority: 1,
          owner: {id: 2, name: '李四', avatar: 'avatars:svg-12'},
          dueDate: new Date(),
          reminder: false,
        },
      ]
    },
  ];

  constructor(private dialog: MatDialog,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  launchNewTaskDialog() {
    const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: '新建任务'}});
  }

  launchCopyTaskDialog() {
    const dialogRef = this.dialog.open(CopyTaskComponent, {data: {lists: this.lists}});
  }

  launchUpdateTaskDialog(task) {
    const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: '修改任务', task: task}});
  }

  launchConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除任务列表', content: '请确认删除该任务列表！'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  launchEditListDialog(list) {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: '修改任务列表', list: list}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  launchNewListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: '新建任务列表'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  handleMove(srcData, list) {
    switch (srcData.tag) {
      case 'task-item':
        console.log('handling item.');
        break;
      case 'task-list':
        console.log('handling list.');
        const srcList = srcData.data;
        const tempOrder = srcList.order;
        srcList.order = list.order;
        list.order = tempOrder;
        break;
      default:
        break;
    }
  }

  handleQuickTask(desc: string) {
    console.log(desc);
  }
}
