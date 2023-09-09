import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription, combineLatestWith, map } from "rxjs";

import { CoursesStoreService } from "@app/services/courses-store.service";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";

@Component({
  selector: "app-courses-showing",
  templateUrl: "./courses-showing.component.html",
  styleUrls: ["./courses-showing.component.scss"],
})
export class CoursesShowingComponent implements OnInit, OnDestroy {
  course$ = this.coursesStateFacade.course$.pipe(
    combineLatestWith(this.courseStoreService.authors$),
    this.setAuthors()
  );

  private subscriptions: Subscription[] = [];

  constructor(
    private courseStoreService: CoursesStoreService,
    private coursesStateFacade: CoursesStateFacade,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((p) => {
        const id = p["id"];
        this.coursesStateFacade.getSingleCourse(id);
        this.courseStoreService.getAllAuthors();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  private setAuthors() {
    return map(([c, a]) => {
      console.log(c);
      console.log(a);

      if (!c) {
        return null;
      }
      const authors = [];
      for (let i = 0; i < c.authors.length; i++) {
        for (let j = 0; j < a.length; j++) {
          if (c.authors[i] === a[j].id) {
            authors.push(a[j].name);
          }
        }
      }
      return { ...c, authors: authors };
    });
  }
}
