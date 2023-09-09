import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

import { Course } from "@app/models/course.model";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";

@Component({
  selector: "app-courses-editing",
  templateUrl: "./courses-editing.component.html",
  styleUrls: ["./courses-editing.component.scss"],
})
export class CoursesEditingComponent implements OnInit, OnDestroy {
  course$ = this.coursesStateFacade.course$;
  authors$ = this.coursesStoreService.authors$;

  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesStoreService: CoursesStoreService,
    private router: Router,
    private coursesStateFacade: CoursesStateFacade
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((p) => {
        const id = p["id"];
        this.coursesStateFacade.getSingleCourse(id);
      })
    );
    this.coursesStoreService.getAllAuthors();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onCourseEdit(course: Course) {
    this.coursesStateFacade.editCourse(course, course.id);
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
