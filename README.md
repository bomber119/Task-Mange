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
  - 2.3.2 MatSideNav组件
  - 2.3.3 MatToolbar组件

### 第三章 动画

### 第四章 Angular的核心概念

### 第五章 RxJS的操作符

### 第六章 Angular的响应式编程

### 第七章 Redux

### 第八章 自动化测试

### 第九章 总结和回顾
