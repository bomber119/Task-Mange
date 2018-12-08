import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // 定义菜单按钮为输出型的事件发射器对象
  @Output() toggle = new EventEmitter<void>();
  // 深色主题切换事件的发射器对象
  @Output() toggleDarkTheme = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {
  }

  // 菜单按钮点击的方法
  openSidebar() {
    this.toggle.emit();
  }

  onChange(checked: boolean) {
    this.toggleDarkTheme.emit(checked);
  }

}
