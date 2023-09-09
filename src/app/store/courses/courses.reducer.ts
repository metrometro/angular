import { Action, createReducer, on } from "@ngrx/store";

import * as CourseActions from "./courses.actions";
import { Course } from "@app/models/course.model";

export const coursesFeatureKey = "courses";

export interface CoursesState {
  allCourses: Course[];
  course: Course | null;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: string;
  errorMessage: string | null;
}

export const initialState: CoursesState = {
  allCourses: [],
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: "",
  errorMessage: null,
};

export const coursesReducer = createReducer(
  initialState,
  on(CourseActions.requestAllCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
  })),
  on(CourseActions.requestAllCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
  })),
  on(CourseActions.requestAllCoursesFail, (state, { error }) => ({
    ...state,
    errorMessage: error.message,
    isAllCoursesLoading: false,
  })),
  on(CourseActions.requestSingleCourse, (state, { id }) => ({
    ...state,
    course: {
      id,
      authors: [],
      creationDate: new Date(),
      description: "",
      duration: 0,
      title: "",
    },
    isSingleCourseLoading: true,
  })),
  on(CourseActions.requestSingleCourseSuccess, (state, { course }) => ({
    ...state,
    course: course,
    isSingleCourseLoading: false,
  })),
  on(CourseActions.requestSingleCourseFail, (state, { error }) => ({
    ...state,
    course: null,
    errorMessage: error.message,
    isSingleCourseLoading: false,
  })),
  on(CourseActions.requestFilteredCourses, (state, { title }) => ({
    ...state,
    isSearchState: title,
    isAllCoursesLoading: true,
  })),
  on(CourseActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
  })),
  on(CourseActions.requestFilteredCoursesFail, (state, { error }) => ({
    ...state,
    errorMessage: error.message,
    isAllCoursesLoading: false,
  })),
  on(CourseActions.requestDeleteCourse, (state, { id }) => ({
    ...state,
    course: {
      id,
      authors: [],
      creationDate: new Date(),
      description: "",
      duration: 0,
      title: "",
    },
    isSingleCourseLoading: true,
  })),
  on(CourseActions.requestDeleteCourseSuccess, (state) => ({
    ...state,
    allCourses: state.allCourses.filter((c) => c.id !== state.course?.id),
    course: null,
    isSingleCourseLoading: false,
  })),
  on(CourseActions.requestDeleteCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error.message,
    isSingleCourseLoading: false,
  })),
  on(CourseActions.requestEditCourse, (state, { id, course }) => ({
    ...state,
    course: course,
    isSingleCourseLoading: true,
  })),
  on(CourseActions.requestEditCourseSuccess, (state, { course }) => ({
    ...state,
    course: course,
    allCourses: [...state.allCourses.filter((c) => c.id !== course.id), course],
    isSingleCourseLoading: false,
  })),
  on(CourseActions.requestEditCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error.message,
    isSingleCourseLoading: false,
  })),
  on(CourseActions.requestCreateCourse, (state, { course }) => ({
    ...state,
    course: course,
    isSingleCourseLoading: true,
  })),
  on(CourseActions.requestCreateCourseSuccess, (state, { course }) => ({
    ...state,
    course: course,
    allCourses: [...state.allCourses, course],
    isSingleCourseLoading: false,
  })),
  on(CourseActions.requestCreateCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error.message,
    isSingleCourseLoading: false,
  }))
);

export const reducer = (state: CoursesState, action: Action): CoursesState =>
  coursesReducer(state, action);
