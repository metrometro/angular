import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

import { Course } from "@app/models/course.model";
import { Author } from "@app/models/author.model";
import { CoursesStoreService } from "@app/services/courses-store.service";

@Component({
  selector: "app-courses-editing",
  templateUrl: "./courses-editing.component.html",
  styleUrls: ["./courses-editing.component.scss"],
})
export class CoursesEditingComponent implements OnInit, OnDestroy {
  authors: Author[] = [];
  course!: Course;

  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesStoreService: CoursesStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((p) => {
        const id = p["id"];
        this.subscriptions.push(
          this.coursesStoreService.courses$.subscribe(
            (c) => (this.course = c[0])
          )
        );
        this.coursesStoreService.getCourse(id);
      })
    );
    this.subscriptions.push(
      this.coursesStoreService.authors$.subscribe((a) => (this.authors = a))
    );
    this.coursesStoreService.getAllAuthors();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onCourseEdit(course: Course) {
    this.coursesStoreService.editCourse(course.id, course);
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
