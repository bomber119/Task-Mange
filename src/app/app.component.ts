import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // 接收header中深色主题按钮发射事件（boolean），
  // 判断mat-sidenav-container绑定的class属性的是否为真，
  // 如果为真将加载深色主题myapp-dark-theme
  darkTheme = false;
  switchTheme(dark) {
    this.darkTheme = dark;
  }
}
