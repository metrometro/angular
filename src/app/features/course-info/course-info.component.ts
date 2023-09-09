import { Component, Input } from "@angular/core";
import { Location } from "@angular/common";

import { Course } from "@app/app.component";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent {
  @Input() course!: Course | null;

  constructor(private location: Location) {}

  getAuthors() {
    return this.course ? this.course.authors.join(", ") : [];
  }

  goBack() {
    this.location.back();
  }
}
