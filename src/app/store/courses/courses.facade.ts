import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";

import { Course } from "@app/models/course.model";
import {
  isAllCoursesLoadingSelector,
  isSingleCourseLoadingSelector,
  isSearchingStateSelector,
  getCourses,
  getAllCourses,
  getCourse,
  getErrorMessage,
} from "./courses.selectors";
import {
  requestAllCourses,
  requestSingleCourse,
  requestFilteredCourses,
  requestEditCourse,
  requestCreateCourse,
  requestDeleteCourse,
} from "./courses.actions";

@Injectable({
  providedIn: "root",
})
export class CoursesStateFacade {
  isAllCoursesLoading$ = this.store.pipe(select(isAllCoursesLoadingSelector));
  isSingleCourseLoading$ = this.store.pipe(
    select(isSingleCourseLoadingSelector)
  );
  isSearchingState$ = this.store.pipe(select(isSearchingStateSelector));
  courses$ = this.store.pipe(select(getCourses));
  allCourses$ = this.store.pipe(select(getAllCourses));
  course$ = this.store.pipe(select(getCourse));
  errorMessage$ = this.store.pipe(select(getErrorMessage));

  constructor(private store: Store) {}

  getAllCourses() {
    this.store.dispatch(requestAllCourses());
  }

  getSingleCourse(id: string) {
    this.store.dispatch(requestSingleCourse({ id }));
  }

  getFilteredCourses(searchValue: string) {
    this.store.dispatch(requestFilteredCourses({ title: searchValue }));
  }

  editCourse(body: Course, id: string) {
    this.store.dispatch(requestEditCourse({ id, course: body }));
  }

  createCourse(body: Course) {
    this.store.dispatch(requestCreateCourse({ course: body }));
  }

  deleteCourse(id: string) {
    this.store.dispatch(requestDeleteCourse({ id }));
  }
}
