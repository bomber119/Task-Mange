import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';


@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  // 自定义表单控件需要依赖注入下面两个常量到框架中
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true,
    }
  ]
})

// 自定义的表单控件需要实现ControlValueAccessor接口
export class ImageListSelectComponent implements ControlValueAccessor {

  // 模版中使用该表单控件时，需要配置的参数
  @Input() useSvgIcon = false;  // 是否为SVG图像
  @Input() title = '请选择';  // 表单控件的标题
  @Input() cols = 6;  // 表单控件的列数，默认为6
  @Input() rowHeight = '64px';  // 表单控件默认的行高
  @Input() itemWidth = '80px';  // 表单控件默认图片的宽度
  @Input() items: string[] = [];  // 表单控件输入的图片地址的列表

  selected: string;  // 存储选中图片的地址

  constructor() { }

  // 定义一个空函数，用于接收参数
  private propagateChange = (_: any) => {};

  // 返回选中的图片的方法
  onChange(i) {
    this.selected = this.items[i];
    this.propagateChange(this.selected);
  }

  // ControlValueAccessor接口默认的控件写入值的方法
  writeValue(obj: any): void {
    this.selected = obj;
  }

  // ControlValueAccessor接口默认的控件值改变时的方法
  registerOnChange(fn: any): void {
    this.propagateChange = fn;

  }

  // ControlValueAccessor接口默认的控件被触碰过的方法
  registerOnTouched(fn: any): void {}

  // 自定义的选中图片的验证方法
  validate(fc: FormControl): {[key: string]: any} {
    return this.selected ? null : {imageListInvalid: {valid: false}};
  }

}
