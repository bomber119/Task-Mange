import {Component, EventEmitter, Input, Output, OnInit, HostBinding, HostListener, ChangeDetectionStrategy} from '@angular/core';
import { cardAnimation } from '../../animations/card.animation';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [cardAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectItemComponent implements OnInit {

  @Input() item;
  @Output() Invite = new EventEmitter<void>();
  @Output() Edit = new EventEmitter<void>();
  @Output() Delete = new EventEmitter<void>();
  @HostBinding('@cardAnimation') cardState = 'out';  // 将卡片动画的trigger绑定到父组件上

  constructor() { }

  ngOnInit() {
  }

  // 通过监听父组件的相关DOM事件（mouseenter,mouseleave）来改变项目卡片的状态，从而触发动画效果
  @HostListener('mouseenter')
  omMouseEnter() {
    this.cardState = 'hover';
  }
  @HostListener('mouseleave')
  omMouseLeave() {
    this.cardState = 'out';
  }


  onInviteClick() {
    this.Invite.emit();
  }

  onEditClick() {
    this.Edit.emit();
  }

  onDeleteClick() {
    this.Delete.emit();
  }

}
