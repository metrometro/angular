import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Course } from "@app/models/course.model";
import { Author } from "@app/models/author.model";
import { SuccessfulRequest } from "@app/models/request.model";

const API_URL = "http://localhost:4000";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<SuccessfulRequest<Course[]>>(`${API_URL}/courses/all`);
  }

  createCourse(course: Course) {
    return this.http.post<SuccessfulRequest<Course>>(`${API_URL}/courses/add`, course);
  }

  editCourse(id: string, course: Course) {
    return this.http.put<SuccessfulRequest<Course>>(`${API_URL}/courses/${id}`, course);
  }

  getCourse(id: string) {
    return this.http.get<SuccessfulRequest<Course>>(`${API_URL}/courses/${id}`);
  }

  deleteCourse(id: string) {
    return this.http.delete<SuccessfulRequest<Course>>(`${API_URL}/courses/${id}`);
  }

  filterCourses(value: string) {
    // Add your code here
  }

  getAllAuthors() {
    return this.http.get<SuccessfulRequest<Author[]>>(`${API_URL}/authors/all`);
  }

  createAuthor(name: string) {
    return this.http.post<SuccessfulRequest<Author>>(`${API_URL}/authors/add`, { name: name });
  }

  getAuthorById(id: string) {
   return this.http.get<SuccessfulRequest<Author>>(`${API_URL}/authors/${id}`);
  }
}
