import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { CourseCardComponent } from './course-card.component';
import { CoursesListComponent } from './courses-list/courses-list.component';

const components = [
  CourseCardComponent,
  CoursesListComponent
];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [components]
})
export class CoursesModule { }
