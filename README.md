# TaskMange

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.3.

### 第一章 环境搭建
- 1.1 项目总体描述
- 1.2 环境搭建
  - 1.2.1 node.js的安装
  - 1.2.2 IDE: WebStorm
  - 1.2.3 Chrome Plugin: Augury
  - 1.2.4 json-server 安装  
    `npm i -g json-server`
  - 1.2.5 POSTMAN: restful API 调试工具

### 第二章 Material UI
- 2.1 项目工程结构
  - 2.1.1 项目结构
    - 根模块：src/app 
      - 核心模块：core
      - 服务模块：service
      - Redux模块：reducer
      - Effect模块：effect
      - 共享模块：shared
      - 登录模块：login
      - 项目模块：projects
      - 任务模块：tasks
      - 日历模块：calendar
      - 领域对象：domain
      - 动画目录：animation
      - 工具目录：utils
    - 资源目录：src/assets
  - 2.1.2 新建工程   
  `ng new Task-Mange --style=scss`
  - 2.1.3 创建核心模块  
  `ng g m core` 
  - 2.1.4 创建共享模块  
  `ng g m shared`
  - 2.1.5 项目与任务的关系
  - 2.1.6 项目与用户的关系
- 2.2 Material UI布局
  - 2.2.1 创建header组件  
  `ng g c core/header --spec=false`
  - 2.2.2 创建footer组件  
  `ng g c core/footer --spec=false`
  - 2.2.3 创建sidebar组件   
  `ng g c core/sidebar --spec=false`
  - 2.2.4 flex布局方式
- 2.3 Material 介绍
  - 2.3.1 安装Material及其依赖库   
  `npm i --save @angular/material`  
  `npm i --save @angular/cdk@7.1.0`
  - 2.3.2 MatSideNav 组件的使用
  - 2.3.3 MatToolbar 组件的使用
- 2.4 MatIcon 组件的使用
  - 2.4.1 svgIcon 注入
- 2.5 Input 组件的使用
  - 2.5.1 新建 domain/user.model
  - 2.5.2 新建 login 模块   
  `ng g m login`
  - 2.5.3 新建 login组件    
  `ng g c login/login --spec=false`
- 2.6 MatCard 和 MatButton 组件的使用
  - 2.6.1 MatCard
  - 2.6.2 MatButton
  - 2.6.3 login的模版设计
- 2.7 侧滑菜单使用 MatList组件
  - 2.7.1 MatList MatNavList
  - 2.7.2 sidebar的模版设计
- 2.8 Material Theme 自定义主题切换   
  - [官方参考说明](https://material.angular.io/guide/theming)
- 2.9 GridList 设计注册页面头像列表
- 2.10 Dialog对话框的使用
  - 2.10.1 新建project模块
  - 2.10.2 在project模块中新建:
    - project-list 项目列表组件
    - project-item 项目组件
    - *new-project 项目新建组件(Dialog)
      - 父组件向Dialog传值
      - Dialog向父组件返回值
    - invite 项目邀请组件
- 2.11 AutoComplete 组件的使用
  - 设计invite组件
  - AutoComplete需要和Input配合使用
- 2.12 任务列表的设计
  - 新建task-home组件 构造一组原始数据用于展现
  - 新建task-list组件
  - 新建task-header组件 设计menu菜单
  - 新建task-item组件
- 2.13 task-item组件设计
  - checkbox radio select介绍
  - matTooltip 组件介绍
  - ngClass 通过多条件绑定class属性
- 2.14 新任务对话框设计
  - 2.14.1 Datepicker组件介绍  
    ```
    // 在SharedModule中加入如下代码，可调整DatePicker的国家样式
    providers: [
       {provide: MAT_DATE_LOCALE, useValue: 'zh-CN'},
    ],
    ```
  - 2.14.2 新建new-task组件
- 2.15 任务列表 移动内容对话框
  - select组件介绍
  - 移动列表所有内容的功能实现
- 2.16 & 2.17 完成主框架
  - Project界面：修改、删除功能
  - Task界面：TaskList的新建、修改、移动、删除功能

### 第三章 动画
- 3.1 animations介绍
- 3.2 缓动函数和关键帧
- 3.3 Card和Task的动画
  - trigger 绑定到元素
  - state -> style 定义不同状态的样式
  - translation -> animate 状态转化时执行动画
- 3.4 路由动画
  - 路由动画不能之间绑定到模版元素上
  - Group 同时执行一组动画
  - Query 父节点选择子节点
  - Stagger 将动画运用到多个选择到的子节点上,并设置延时

### 第四章 Angular的核心概念
- 4.1 依赖性注入
  - Injector 创建依赖注入的实例
  - Provider 如何创建Injector
  - Object 需要依赖的对象
- 4.2 ChangeDetection 变化检测
  - ApplicationRef监听NgZone的onTurnDone，然后执行检测
  - 组件树 --> CD树 正常检测是遍历CD树上的所有元素
  - OnPush,关闭该组件的CD检测
- 4.3 Drag/Drop指令
- 4.4 结构型指令、模块、样式
  - *ngIf *ngFor
    通过ViewContainerRef和TemplateRef来动态的设定模版中的元素
  - ngClass 用于条件动态指定样式类（一组样式）
  - ngStyle 用于条件动态指定样式（少量样式）
  - [class.your_style] 一组自定义样式直接对应一个条件true/false加载
- 4.5 模版驱动型表单
  - [(ngModel)] 双向绑定
  - 在task中建立QuickTask组件
- 4.6 响应式表单 Login组件
  - FormControl 表单控件
  - FormGroup
  - FormBuilder
  - 同步验证器
  - 异步验证器
  - 动态指定验证器
- 4.7 响应式表单 Register组件
  - 自定义一个表单控件imageListSelect
  - 将自定义的表单控件加入到Register组件
  
### 第五章 RxJS的操作符
- 5.1 RxJS 响应式编程介绍

### 第六章 Angular的响应式编程

### 第七章 Redux

### 第八章 自动化测试

### 第九章 总结和回顾
