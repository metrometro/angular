import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { Course } from "@app/models/course.model";
import { Author } from "@app/models/author.model";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";

@Component({
  selector: "app-courses-adding",
  templateUrl: "./courses-adding.component.html",
  styleUrls: ["./courses-adding.component.scss"],
})
export class CoursesAddingComponent implements OnInit, OnDestroy {
  authors: Author[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private coursesStoreService: CoursesStoreService,
    private coursesStateFacade: CoursesStateFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.coursesStoreService.authors$.subscribe((a) => (this.authors = a))
    );
    this.coursesStoreService.getAllAuthors();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onCourseCreate(course: Course) {
    this.coursesStateFacade.createCourse(course);
    this.subscriptions.push(
      this.coursesStoreService.isLoading$.subscribe((r) => {
        if (!r) {
          this.router.navigate(["/courses"]);
        }
      })
    );
  }

  onAuthorCreate(name: string) {
    this.coursesStoreService.createAuthor(name);
  }
}
