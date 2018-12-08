import {ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {combineLatest, merge, Subscription} from 'rxjs';
import {differenceInDays, differenceInMonths, differenceInYears, isBefore, parse, subDays, subMonths, subYears} from 'date-fns';
import {convertToDate, isValidDate} from '../../utils/date.util';
import {debounceTime, distinctUntilChanged, filter, map, startWith} from 'rxjs/operators';

// 创建一个年龄单位的枚举对象
export enum AgeUnit {
  Year = 0,
  Month,
  Day
}

// 创建年龄的接口
export interface Age {
  age: number;
  unit: AgeUnit;
}

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class AgeInputComponent implements ControlValueAccessor, OnInit, OnDestroy {

  selectedUnit = AgeUnit.Year;  // 默认年龄单位为年
  form: FormGroup;
  // 构造年龄单位的数组，用于UI控件的显示
  ageUnits = [
    { value: AgeUnit.Year, label: '岁' },
    { value: AgeUnit.Month, label: '月' },
    { value: AgeUnit.Day, label: '天' }
  ];

  @Input() daysTop = 90;  // 按天记，年龄最大值为90
  @Input() daysBottom = 0;  // 按天记，年龄最小值为0
  @Input() monthsTop = 24;  // 按月记，年龄最大值为24
  @Input() monthsBottom = 1;  // 按月记，年龄最小值为1
  @Input() yearsTop = 150;  // 按年记，年龄最大值为150
  @Input() yearsBottom = 1;  // 按年记，年龄最小值为1
  @Input() debounceTime = 300;  // 控件的检测时间设置为300ms

  private subBirth: Subscription;  // 初始化一个可销毁的可观察对象subBirth
  private propagateChange = (_: any) => {};  // 定义一个空方法，用于接收参数
  constructor(private fb: FormBuilder) { }  // 定义fb，用于构造表单组

  ngOnInit() {
    const initDate = convertToDate(subYears(Date.now(), 30));  // 初始的日期是：当前时间减30年，并格式化为YYYY-MM-DD的日期格式
    const initAge = this.toAge(initDate);  // 初始的年龄对象，使用初始日期通过toAge计算得到Age对象，包含年龄数字和年龄单位
    // 使用FormBuilder初始化form表单
    this.form = this.fb.group({
      birthday: [parse(initDate), this.validateDate],  // 初始化birthday控件，使用initDate作为初始值，并验证
      age: this.fb.group(
        {
          ageNum: [initAge.age],  // 使用年龄对象中的数字初始化ageNum控件
          ageUnit: [initAge.unit]  // 使用年龄对象中的单位初始化ageUnit控件
        },
        { validator: this.validateAge('ageNum', 'ageUnit') }  // 验证年龄的表单组，是否符合数字和单位的组合
      )
    });
    // 从UI控件中取回生日的值，赋给birthday
    const birthday = this.form.get('birthday');
    if (!birthday) {
      return;
    }
    // 从UI控件中取回年龄对象的值，赋给age对象
    const age = this.form.get('age');
    if (!age) {
      return;
    }
    // 从UI控件中取回年龄的数值，赋给ageNum
    const ageNum = this.form.get('age.ageNum');
    if (!ageNum) {
      return;
    }
    // 从UI控件中取回年龄的单位，赋给ageUnit
    const ageUnit = this.form.get('age.ageUnit');
    if (!ageUnit) {
      return;
    }

    // 定义生日的可观察对象，当该对象的值发生改变时：
    const birthday$ = birthday.valueChanges.pipe(
      map(d => ({ date: d, from: 'birthday' })),
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      filter(date => birthday.valid)
    );
    // 定义年龄数字的可观察对象，当该对象的值发生改变时：
    const ageNum$ = ageNum.valueChanges.pipe(
      startWith(ageNum.value),
      debounceTime(this.debounceTime),
      distinctUntilChanged()
    );
    // 定义年龄单位的可观察对象，当该对象的值发生改变时：
    const ageUnit$ = ageUnit.valueChanges.pipe(
      startWith(ageUnit.value),
      debounceTime(this.debounceTime),
      distinctUntilChanged()
    );
    // 定义年龄对象的可观察对象，当该对象的值发生改变时：
    const age$ = combineLatest(ageNum$, ageUnit$, (_num, _unit) =>
      this.toDate({age: _num, unit: _unit })
    ).pipe(
      map(d => ({ date: d, from: 'age' })),
      filter(_ => age.valid)
    );

    // 定义一个生日和年龄对象合并的可观察对象，并进行验证
    const merged$ = merge(birthday$, age$).pipe(filter(_ => this.form.valid));

    // 使用可销毁的可观察对象subBirth订阅最终合并的流，并根据变化结果处理UI控件中值
    this.subBirth = merged$.subscribe(date => {
      const aged = this.toAge(date.date);
      if (date.from === 'birthday') {
        if (aged.age === ageNum.value && aged.unit === ageUnit.value) {
          return;
        }
        ageUnit.patchValue(aged.unit, {
          emitEvent: false,
          emitModelToViewChange: true,
          emitViewToModelChange: true
        });
        ageNum.patchValue(aged.age, { emitEvent: false });
        this.selectedUnit = aged.unit;
        this.propagateChange(date.date);
      } else {
        const ageToCompare = this.toAge(birthday.value);
        if (aged.age !== ageToCompare.age || aged.unit !== ageToCompare.unit) {
          birthday.patchValue(parse(date.date), { emitEvent: false });
          this.propagateChange(date.date);
        }
      }
    });
  }

  // 组件销毁时，取消所有订阅的数据流，释放资源
  ngOnDestroy() {
    if (this.subBirth) {
      this.subBirth.unsubscribe();
    }
  }

  // 表单控件写入值得方法，表单控件的必有方法
  public writeValue(obj: Date) {
    if (obj) {
      const date = parse(convertToDate(obj));
      const birthday = this.form.get('birthday');
      if (!birthday) {
        return;
      }
      birthday.patchValue(date, { emitEvent: true });
    }
  }

  // 表单控件中值改变后的方法，表单控件的必有方法
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  // 表单控件被触碰过的方法，表单控件的必有方法
  public registerOnTouched() {}

  // 通用的验证器
  validate(c: FormControl): { [key: string]: any } | null {
    const val = c.value;
    if (!val) {
      return null;
    }
    if (isValidDate(val)) {
      return null;
    }
    return {
      ageInvalid: true
    };
  }

  // 日期验证器，用于生日控件的验证
  validateDate(c: FormControl): { [key: string]: any } | null {
    const val = c.value;
    return isValidDate(val)
      ? null
      : {
        birthdayInvalid: true
      };
  }

  // 年龄对象的验证器，用于组合验证年龄的数值和单位
  validateAge(ageNumKey: string, ageUnitKey: string) {
    return (group: FormGroup): { [key: string]: any } | null => {
      const ageNum = group.controls[ageNumKey];
      const ageUnit = group.controls[ageUnitKey];
      let result = false;
      const ageNumVal = ageNum.value;

      switch (ageUnit.value) {
        case AgeUnit.Year: {
          result = ageNumVal >= this.yearsBottom && ageNumVal <= this.yearsTop;
          break;
        }
        case AgeUnit.Month: {
          result =
            ageNumVal >= this.monthsBottom && ageNumVal <= this.monthsTop;
          break;
        }
        case AgeUnit.Day: {
          result = ageNumVal >= this.daysBottom && ageNumVal <= this.daysTop;
          break;
        }
        default: {
          result = false;
          break;
        }
      }
      return result
        ? null
        : {
          ageInvalid: true
        };
    };
  }

  // 从生日的日期字符串计算年龄对象的方法
  private toAge(dateStr: string): Age {
    const date = parse(dateStr);  // 将生日字符串格式化为日期格式
    const now = new Date();  // 获取当前日期
    // 首先，将当前日期减去90天后和生日比较，如果早于生日，则年龄对象为：
    // 年龄数值为当前日期减生日的天数，年龄单位为天
    if (isBefore(subDays(now, this.daysTop), date)) {
      return {
        age: differenceInDays(now, date),
        unit: AgeUnit.Day
      };
    // 否则，将当前日期减去24个月后和生日比较，如果早于生日，则年龄对象为：
    // 年龄数值为当前日期减生日的月数，年龄单位为月
    } else if (isBefore(subMonths(now, this.monthsTop), date)) {
      return {
        age: differenceInMonths(now, date),
        unit: AgeUnit.Month
      };
    // 最后，年龄数值为当前日期减生日的年数，年龄单位为岁
    } else {
      return {
        age: differenceInYears(now, date),
        unit: AgeUnit.Year
      };
    }
  }

  // 从年龄单位对象计算出生日的方法
  private toDate(age: Age): string {
    const now = new Date();  // 获取当前时间
    // 根据年龄对象中年龄单位的具体值（岁/月/天），分别计算
    switch (age.unit) {
      // 年龄单位为岁
      case AgeUnit.Year: {
        return convertToDate(subYears(now, age.age));
      }
      // 年龄单位为月
      case AgeUnit.Month: {
        return convertToDate(subMonths(now, age.age));
      }
      // 年龄单位为天
      case AgeUnit.Day: {
        return convertToDate(subDays(now, age.age));
      }
      // 当年龄对象不存时，默认的的生日为1991年1月1日
      default: {
        return '1991-01-01';
      }
    }
  }

}
