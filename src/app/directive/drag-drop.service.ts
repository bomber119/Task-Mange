import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// 定义被拖动的UI组件的数据结构，并导出
export interface DragData {
  tag: string;
  data: any;
}

// 将该服务注入到根服务中
@Injectable({
  providedIn: 'root'
})

// 拖放服务数据对象的定义
export class DragDropService {

  // 使用RxJS中BehaviorSubject对象创建一个临时的可观察的数据对象
  private _dragData = new BehaviorSubject<DragData>(null);

  // 创建拖放对象数据的方法：
  // 用于在拖动时，将UI对象的数据存入临时变量_dragData
  setDragData(data: DragData) {
    this._dragData.next(data);
  }

  // 获取拖放对象数据的方法：
  // 用于在放置时，将临时变量_dragData转化为可观察对象，便于原宿主和新宿主处理数据的变化
  getDragData(): Observable<DragData> {
    return this._dragData.asObservable();
  }

  // 清空拖放对象数据的方法：
  // 用于放置完成后，清除临时变量_dragData中的数据
  clearDragData() {
    this._dragData.next(null);
  }
}
