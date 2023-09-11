import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesShowingRoutingModule } from './courses-showing-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { CoursesShowingComponent } from './courses-showing.component';
import { CourseInfoComponent } from '@app/features/course-info/course-info.component';


@NgModule({
  declarations: [
    CoursesShowingComponent,
    CourseInfoComponent
  ],
  imports: [
    CommonModule,
    CoursesShowingRoutingModule,
    SharedModule
  ]
})
export class CoursesShowingModule { }
