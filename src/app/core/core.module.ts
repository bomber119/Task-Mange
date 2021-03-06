import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { ServicesModule } from '../services/services.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { loadSvgResources } from '../utils/svg.util';
import '../utils/debug.util';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    ServicesModule.forRoot(),
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    {
      provide: 'BASE_CONFIG',
      useValue: {
        uri: 'http://localhost:3000'
      }
    }
  ]
})
export class CoreModule {
  // 加载核心模块
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    ir: MatIconRegistry,
    ds: DomSanitizer
  ) {
      if (parent) {
        throw new Error('核心模块已经存在，不能再次加载！');  // 如果重复加载则抛出错误信息
      }

      loadSvgResources(ir, ds);
    }
}
