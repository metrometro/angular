import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesAddingRoutingModule } from './courses-adding-routing.module';
import { CoursesAddingComponent } from './courses-adding.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    CoursesAddingComponent
  ],
  imports: [
    CommonModule,
    CoursesAddingRoutingModule,
    SharedModule
  ]
})
export class CoursesAddingModule { }
