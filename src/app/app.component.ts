import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  // 接收header中深色主题切换按钮发射的事件darkTheme（boolean），
  // 判断mat-sidenav-container绑定的class属性的是否为真，
  // 如果为真将加载深色主题 myapp-dark-theme
  // 同时通过OverlayContainer的方法，将深色主题加入到浮动层元素（dialog，menu等）
  darkTheme = false;
  constructor(private oc: OverlayContainer) { }
  switchTheme(dark) {
    this.darkTheme = dark;
    this.oc.getContainerElement().classList.add(dark ? 'myapp-dark-theme' : null);
  }
}
