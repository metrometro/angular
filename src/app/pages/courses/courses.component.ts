import { Component, OnInit, OnDestroy } from "@angular/core";
import { combineLatestWith, map, Subscription } from "rxjs";
import { Router } from "@angular/router";

import { Course } from "@app/models/course.model";
import { AuthService } from "@app/auth/services/auth.service";
import { UserStoreService } from "@app/user/services/user-store.service";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses$ = this.getAllCourses();
  isAdmin: boolean = false;

  private subscribtions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private userStoreService: UserStoreService,
    private courseStoreService: CoursesStoreService,
    private router: Router,
    private coursesStateFacade: CoursesStateFacade
  ) {}

  ngOnInit(): void {
    this.subscribtions.push(
      this.userStoreService.isAdmin$.subscribe((v) => (this.isAdmin = v))
    );
    this.courseStoreService.getAllAuthors();
    this.coursesStateFacade.getAllCourses();
  }

  ngOnDestroy(): void {
    this.subscribtions.forEach((s) => s.unsubscribe());
  }

  onShow(id: string) {
    this.router.navigate([this.router.routerState.snapshot.url, id]);
  }

  onEdit(id: string) {
    this.router.navigate([this.router.routerState.snapshot.url, "edit", id]);
  }

  onCreate() {
    this.router.navigate([this.router.routerState.snapshot.url, "add"]);
  }

  onDelete(id: string) {
    console.log(`delete: ${id}`);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  private getAllCourses() {
    return this.coursesStateFacade.allCourses$.pipe(
      combineLatestWith(this.courseStoreService.authors$),
      map(([c, a]) => {
        const courses = [];
        for (let i = 0; i < c.length; i++) {
          const course = { ...c[i], authors: [...c[i].authors] };
          for (let j = 0; j < course.authors.length; j++) {
            const author = a.find((cur) => cur.id === course.authors[j]);
            course.authors[j] = author?.name || "";
          }
          courses.push(course);
        }
        return courses;
      })
    );
  }
}
