import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription, combineLatestWith, map } from "rxjs";

import { Course } from "@app/models/course.model";
import { CoursesStoreService } from "@app/services/courses-store.service";

@Component({
  selector: "app-courses-showing",
  templateUrl: "./courses-showing.component.html",
  styleUrls: ["./courses-showing.component.scss"],
})
export class CoursesShowingComponent implements OnInit, OnDestroy {
  course!: Course;

  private subscriptions: Subscription[] = [];

  constructor(
    private courseStoreService: CoursesStoreService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((p) => {
        const id = p["id"];
        this.courseStoreService.getCourse(id);
        this.courseStoreService.getAllAuthors();
        this.subscriptions.push(
          this.courseStoreService.courses$
            .pipe(
              combineLatestWith(this.courseStoreService.authors$),
              map(([c, a]) => {
                const courses = [];
                for (let i = 0; i < c.length; i++) {
                  const course = { ...c[i], authors: [...c[i].authors] };
                  for (let j = 0; j < course.authors.length; j++) {
                    const author = a.find(
                      (cur) => cur.id === course.authors[j]
                    );
                    course.authors[j] = author?.name || "";
                  }
                  courses.push(course);
                }
                return courses;
              })
            )
            .subscribe((c) => (this.course = c[0]))
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
