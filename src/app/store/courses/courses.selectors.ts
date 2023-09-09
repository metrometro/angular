import { createSelector, createFeatureSelector } from "@ngrx/store";

import { coursesFeatureKey } from "./courses.reducer";
import { CoursesState } from "./courses.reducer";

export interface AppState {
  [coursesFeatureKey]: CoursesState;
}

export const selectCourseFeature =
  createFeatureSelector<CoursesState>(coursesFeatureKey);

export const isAllCoursesLoadingSelector = createSelector(
  selectCourseFeature,
  (state) => state.isAllCoursesLoading
);

export const isSearchingStateSelector = createSelector(
  selectCourseFeature,
  (state) => state.isSearchState
);

export const isSingleCourseLoadingSelector = createSelector(
  selectCourseFeature,
  (state) => state.isSingleCourseLoading
);

export const getCourses = createSelector(
  selectCourseFeature,
  isSearchingStateSelector,
  (state, filter) => state.allCourses.filter((c) => c.title === filter)
);

export const getAllCourses = createSelector(
  selectCourseFeature,
  (state) => state.allCourses
);

export const getCourse = createSelector(
  selectCourseFeature,
  (state) => state.course
);

export const getErrorMessage = createSelector(
  selectCourseFeature,
  (state) => state.errorMessage
);
