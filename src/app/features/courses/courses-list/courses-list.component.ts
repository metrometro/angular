import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '@app/app.component'; 

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Input() editable: boolean = false;

  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  onShowCourse(id: string) {
    this.showCourse.emit(id);    
  }

  onEditCourse(id: string) {
    this.editCourse.emit(id);
  }

  onDeleteCourse(id: string) {
    this.deleteCourse.emit(id);
  }
}
