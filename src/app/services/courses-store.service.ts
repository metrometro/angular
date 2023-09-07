import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { CoursesService } from "./courses.service";
import { Course } from "@app/models/course.model";
import { Author } from "@app/models/author.model";

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  private courses$$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  private authors$$: BehaviorSubject<Author[]> = new BehaviorSubject<Author[]>([]);
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  courses$ = this.courses$$.asObservable();
  authors$ = this.authors$$.asObservable();
  isLoading$ = this.isLoading$$.asObservable();

  constructor(private courseService: CoursesService) {}

  getAll() {
    this.isLoading$$.next(true);
    this.courseService.getAll().subscribe((r) => {
      this.courses$$.next(r.result);
      this.isLoading$$.next(false);
    });
  }

  createCourse(course: Course) {
    this.isLoading$$.next(true);
    this.courseService
      .createCourse(course)
      .subscribe((_) => this.isLoading$$.next(false));
  }

  getCourse(id: string) {
    this.isLoading$$.next(true);
    this.courseService.getCourse(id).subscribe((r) => {
      this.courses$$.next([r.result]);
      this.isLoading$$.next(false);
    });
  }

  editCourse(id: string, course: Course) {
    this.isLoading$$.next(true);
    this.courseService
      .editCourse(id, course)
      .subscribe((_) => (this.isLoading$$.next(false)));
  }

  deleteCourse(id: string) {
    this.isLoading$$.next(true);
    this.courseService
      .deleteCourse(id)
      .subscribe((_) => (this.isLoading$$.next(false)));
  }

  filterCourses(value: string) {
    // Add your code here
  }

  getAllAuthors() {
    this.isLoading$$.next(true);
    this.courseService.getAllAuthors().subscribe((r) => {
      this.authors$$.next(r.result);
      this.isLoading$$.next(false);
    });
  }

  createAuthor(name: string) {
    this.isLoading$$.next(true);
    this.courseService
      .createAuthor(name)
      .subscribe((_) => (this.isLoading$$.next(false)));
  }

  getAuthorById(id: string) {
    this.isLoading$$.next(true);
    this.courseService.getAuthorById(id).subscribe((r) => {
      this.authors$$.next([r.result]);
      this.isLoading$$.next(false);
    });
  }
}
