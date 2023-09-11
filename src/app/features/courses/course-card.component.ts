import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Course } from '@app/models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  @Input() course!: Course;
  @Input() editable: boolean = false;

  @Output() clickOnShow = new EventEmitter<string>();

  ngOnInit(): void {
    if (!this.course) {
      throw new Error('Attribute "course" is required');
    }
  }

  onShowCourse() {
    this.clickOnShow.emit(this.course.id);
  }
}
