import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewProjectComponent} from '../new-project/new-project.component';
import {InviteComponent} from '../invite/invite.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {routeAnimation} from '../../animations/router.animation';
import {listAnimation} from '../../animations/list.animation';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [routeAnimation, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {

  @HostBinding('@routeAnimation') state;

  projects = [
    {
      'id': 1,
      'name': '企业协作平台',
      'desc': '这是一个企业内部的应用',
      'coverImg': 'assets/img/covers/0.jpg'
    },
    {
      'id': 2,
      'name': '企业协作平台',
      'desc': '这是一个企业内部的应用',
      'coverImg': 'assets/img/covers/1.jpg'
    },
  ];

  constructor(
    private dialog: MatDialog,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: '新建项目'}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = [...this.projects, {id: 3, name: '新项目', desc: '新项目', coverImg: 'assets/img/covers/2.jpg'}];
      this.cd.markForCheck();
    });
  }

  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
  }

  launchEditDialog(project) {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: '修改项目'}});
  }

  launchConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除项目', content: '请确认删除该项目！'}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = this.projects.filter(p => p.id !== project.id);
      this.cd.markForCheck();
    });
  }
}
