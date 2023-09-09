import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { mergeMap, map, catchError } from "rxjs/operators";
import { EMPTY } from "rxjs";

import { CoursesService } from "@app/services/courses.service";
import {
  requestAllCourses,
  requestAllCoursesSuccess,
  requestAllCoursesFail,
  requestSingleCourse,
  requestSingleCourseSuccess,
  requestSingleCourseFail,
  requestDeleteCourse,
  requestDeleteCourseSuccess,
  requestDeleteCourseFail,
  requestEditCourse,
  requestEditCourseSuccess,
  requestEditCourseFail,
  requestCreateCourse,
  requestCreateCourseSuccess,
  requestCreateCourseFail,
} from "./courses.actions";

@Injectable()
export class CoursesEffects {
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestAllCourses),
      mergeMap(() =>
        this.courseService.getAll().pipe(
          map((res) => requestAllCoursesSuccess({ courses: res.result })),
          catchError((e) => {
            requestAllCoursesFail({ error: e });
            return EMPTY;
          })
        )
      )
    )
  );

  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestSingleCourse),
      mergeMap((action) =>
        this.courseService.getCourse(action.id).pipe(
          map((res) => requestSingleCourseSuccess({ course: res.result })),
          catchError((e) => {
            requestSingleCourseFail(e);
            return EMPTY;
          })
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestDeleteCourse),
      mergeMap((action) =>
        this.courseService.deleteCourse(action.id).pipe(
          map(() => requestDeleteCourseSuccess()),
          catchError((e) => {
            requestDeleteCourseFail(e);
            return EMPTY;
          })
        )
      )
    )
  );

  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestEditCourse),
      mergeMap((action) =>
        this.courseService.editCourse(action.id, action.course).pipe(
          map((res) => requestEditCourseSuccess({ course: res.result })),
          catchError((e) => {
            requestEditCourseFail(e);
            return EMPTY;
          })
        )
      )
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestCreateCourse),
      mergeMap((action) =>
        this.courseService.createCourse(action.course).pipe(
          map((res) => requestCreateCourseSuccess({ course: res.result })),
          catchError((e) => {
            requestCreateCourseFail(e);
            return EMPTY;
          })
        )
      )
    )
  );

  redirectToTheCoursesPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          requestCreateCourseSuccess,
          requestEditCourseSuccess,
          requestSingleCourseFail
        )
      ),
    { dispatch: false }
  );

  constructor(
    private courseService: CoursesService,
    private actions$: Actions
  ) {}
}
