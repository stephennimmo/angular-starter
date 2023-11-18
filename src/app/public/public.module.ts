import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '../shared/shared.module';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    IndexComponent,
    LoginComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule
  ]
})
export class PublicModule {
}
