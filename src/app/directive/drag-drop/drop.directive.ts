import {Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2} from '@angular/core';
import {DragData, DragDropService} from '../drag-drop.service';
import {take} from 'rxjs/operators';

// 针对放置行为，创建3个指令：
// app-droppable  使UI组件可以使用该指令；
// dropTags  该UI元素作为宿主容器，设置可容纳的可拖动UI组件
// dragEnterClass  设置当可拖动的UI组件进入时，宿主容器的样式，样式需要在css文件中定义
@Directive({
  selector: '[app-droppable][dropTags][dragEnterClass]'
})

export class DropDirective {

  @Output() dropped = new EventEmitter<DragData>();  // 拖入的组件被放置时，将新进入的组件的数据发射到上层组件中进行处理
  @Input() dragEnterClass: string;
  @Input() dropTags: string[] = [];
  private data$;  // 定义一个变量接收拖入对象的数据

  // 构造el对象为ElementRef，用于选择DOM元素
  // 构造rd对象为Renderer2，用于设置获取到元素的样式
  // 构造service对象为DragDropService，用于处理设置拖放过程中执行的方法
  // 利用service中的方法，获取拖入对象的数据，并赋值个data$
  constructor(private el: ElementRef,
              private rd: Renderer2,
              private service: DragDropService) {
    this.data$ = this.service.getDragData().pipe(take(1));
  }

  // 可拖放组件被拖入宿主容器时的处理方法
  // 监听DOM元素自有的dragenter事件，当事件发生时执行onDragEnter方法：
  // 首先阻止DOM元素默认的Event，阻止DOM元素Event的向上级传播;
  // 然后判断拖动的元素 与 产生事件的元素 是否一致？
  // 如果一致：
  //     判断拖入元素的dragTag是否在宿主元素的DropTags中：
  //     如果在说明可放置：
  //         设置宿主元素有组件拖入时的样式dragEnterClass
  @HostListener('dragenter', ['$event'])
  onDragEnter(ev: Event) {
    ev.preventDefault();  // 阻止DOM元素默认的Event
    ev.stopPropagation();  // 阻止DOM元素Event的向上级传播
    if (this.el.nativeElement === ev.target) {
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.addClass(this.el.nativeElement, this.dragEnterClass);
        }
      });
    }
  }

  // 可拖放组件被拖入宿主容器内，但没有放置时的处理方法
  // 监听DOM元素自有的dragover事件，当事件发生时执行onDragOver方法：
  // 首先阻止DOM元素默认的Event，阻止DOM元素Event的向上级传播;
  // 然后判断拖动的元素 与 产生事件的元素 是否一致？
  // 如果一致：
  //     判断拖入元素的dragTag是否在宿主元素的DropTags中：
  //     如果在说明可放置：
  //         设置宿主的DOM元素自有的特殊效果
  //     如果不在说明不可放置：
  //         将宿主的DOM元素自有的特殊效果清除
  @HostListener('dragover', ['$event'])
  onDragOver(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === ev.target) {
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.setProperty(ev, 'dataTransfer.effectAllowed', 'all');
          this.rd.setProperty(ev, 'dataTransfer.dropEffect', 'move');
        } else {
          this.rd.setProperty(ev, 'dataTransfer.effectAllowed', 'none');
          this.rd.setProperty(ev, 'dataTransfer.dropEffect', 'none');
        }
      });
    }
  }

  // 可拖放组件没有放置，离开宿主容器时的处理方法
  // 监听DOM元素自有的dragleave事件，当事件发生时执行onDragLeave方法：
  // 首先阻止DOM元素默认的Event，阻止DOM元素Event的向上级传播;
  // 然后判断拖动的元素 与 产生事件的元素 是否一致？
  // 如果一致：
  //     判断拖入元素的dragTag是否在宿主元素的DropTags中：
  //     如果在说明可放置：
  //         因为是离开，所以清除宿主元素有组件时的样式dragEnterClass
  @HostListener('dragleave', ['$event'])
  onDragLeave(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === ev.target) {
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
        }
      });
    }
  }

  // 可拖放组件放置到宿主容器时的处理方法
  // 监听DOM元素自有的drop事件，当事件发生时执行onDrop方法：
  // 首先阻止DOM元素默认的Event，阻止DOM元素Event的向上级传播;
  // 然后判断拖动的元素 与 产生事件的元素 是否一致？
  // 如果一致：
  //     订阅该拖入元素的可观察对象的data$，获取该对象内的dragData数据
  //     判断拖入元素的dragTag是否在宿主元素的DropTags中：
  //     如果在说明可放置：
  //         放置后，清除宿主元素有组件时的样式dragEnterClass
  //         放置后，将data$对象中的dragData发射到上层组件中，进行处理
  //         放置后，调用service中的方法清空临时创建的数据
  @HostListener('drop', ['$event'])
  onDrop(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === ev.target) {
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
          this.dropped.emit(dragData);
          this.service.clearDragData();
        }
      });
    }
  }
}
