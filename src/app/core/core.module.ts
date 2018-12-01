import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  // 加载核心模块
  constructor(
    @Optional()  // 第一次加载时
    @SkipSelf()  // 如果已经加载则跳过
    parent: CoreModule) {
      if (parent) {
        throw new Error('核心模块已经存在，不能再次加载！');  // 如果重复加载则抛出错误信息
      }
    }
}
