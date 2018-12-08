import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import {DragDropService} from '../drag-drop.service';

// 针对拖动行为，创建4个指令：
// app-draggable  使UI组件可以使用该指令；
// dragTag  设置被拖出的UI组件的标识，以区别不同的组件和组件中的数据；
// dragData  设置被拖出的UI组件所包含的数据；
// draggedClass  设置被拖出的UI组件，拖动时的样式，样式需要在css文件中定义
@Directive({
  selector: '[app-draggable][dragTag][dragData][draggedClass]'
})

export class DragDirective {

  // 设置UI组件是否可拖动
  private  _isDraggable = false;
  @Input('app-draggable')
  // 设置UI组件是否可拖动的方法
  set isDraggable(value: boolean) {
    this._isDraggable = value;
    this.rd.setAttribute(this.el.nativeElement, 'draggable', `${value}`);
  }
  // 获取UI组件是否可拖动的状态
  get isDraggable() {
    return this._isDraggable;
  }

  // 定义3个变量接收UI组件设置的值
  @Input() draggedClass: string;
  @Input() dragTag: string;
  @Input() dragData: any;

  // 构造el对象为ElementRef，用于选择DOM元素
  // 构造rd对象为Renderer2，用于设置获取到元素的样式
  // 构造service对象为DragDropService，用于处理设置拖放过程中执行的方法
  constructor(private el: ElementRef,
              private rd: Renderer2,
              private service: DragDropService) { }

  // UI组件拖动开始时的处理方法
  // 监听DOM元素自有的dragstart事件，当事件发生时执行onDragStart方法：
  // 首先判断拖动的元素 与 产生事件的元素 是否一致？
  // 如果一致：
  //     那么设置该元素拖动时的样式draggedClass；
  //     使用service中定义的方法，设置该组件的dragTag和dragData；
  @HostListener('dragstart', ['$event'])
  onDragStart(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.addClass(this.el.nativeElement, this.draggedClass);
      this.service.setDragData({tag: this.dragTag, data: this.dragData});
    }
  }

  // UI组件拖动结束时的处理方法
  // 监听DOM元素自有的dragend事件，当事件发生时执行onDragEnd方法：
  // 首先判断拖动的元素 与 产生事件的元素 是否一致？
  // 如果一致：
  //     那么移除该元素拖动时的样式draggedClass；
  @HostListener('dragend', ['$event'])
  onDragEnd(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.draggedClass);
    }
  }
}
