import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

import { Author } from "@app/models/author.model";
import { Course } from "@app/models/course.model";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent implements OnInit {
  @Input() course!: Course;
  @Input() authors: Author[] = [];

  @Output() edit = new EventEmitter<Course>();
  @Output() create = new EventEmitter<Course>();
  @Output() authorCreate = new EventEmitter<string>();

  courseAuthors: Author[] = [];
  courseForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
    private location: Location
  ) {
    library.addIconPacks(fas);
  }

  ngOnInit(): void {
    this.courseAuthors = this.course
      ? this.authors.filter((a) => this.course.authors.includes(a.id))
      : [];
    if (this.course) {
      this.authors = this.authors.filter(
        (a) => !this.course.authors.includes(a.id)
      );
    }
    this.courseForm = this.fb.group({
      title: this.fb.control(this.course ? this.course.title : "", [
        Validators.minLength(2),
        Validators.required,
      ]),
      description: this.fb.control(this.course ? this.course.description : "", [
        Validators.minLength(2),
        Validators.required,
      ]),
      author: this.fb.control("", [
        Validators.minLength(2),
        Validators.pattern(/^[a-z0-9]+$/i),
      ]),
      authors: this.fb.array(this.authors),
      duration: this.fb.control(this.course ? this.course.duration : 0, [
        Validators.min(0),
        Validators.required,
      ]),
    });
  }

  onAuthorCreate() {
    if (
      this.courseForm.controls["author"].touched &&
      this.courseForm.controls["author"].valid
    ) {
      const author = this.courseForm.controls["author"].value;
      this.authorCreate.emit(author);
      this.courseForm.controls["author"].setValue("");
    }
  }

  onAuthorRemove(id: string) {
    const removedAuthor = this.courseAuthors.find((author) => author.id === id);
    this.courseAuthors = this.courseAuthors.filter(
      (author) => author.id !== id
    );
    (<FormArray>this.courseForm.controls["authors"]).push(
      this.fb.control(removedAuthor)
    );
  }

  onAuthorAdd(id: string) {
    const addedAuthorIndex = (<FormArray>this.courseForm.controls["authors"])
      .getRawValue()
      .findIndex((author) => author.id === id);
    const addedAuthor = (<FormArray>this.courseForm.controls["authors"])
      .getRawValue()
      .at(addedAuthorIndex);
    (<FormArray>this.courseForm.controls["authors"]).removeAt(addedAuthorIndex);
    this.courseAuthors.push(addedAuthor);
  }

  onEditCourse() {
    if (this.courseForm.invalid) {
      return;
    }
    const course: Course = {
      id: this.course.id,
      authors: this.courseAuthors.map((a) => a.id),
      creationDate: this.course.creationDate,
      description: this.courseForm.controls["description"].getRawValue(),
      duration: this.courseForm.controls["duration"].getRawValue(),
      title: this.courseForm.controls["title"].getRawValue(),
    };
    this.edit.emit(course);
  }

  onCourseCreate() {
    if (this.courseForm.invalid) {
      return;
    }
    const course: Course = {
      id: "",
      authors: this.courseAuthors.map((a) => a.id),
      creationDate: new Date(),
      description: this.courseForm.controls["description"].getRawValue(),
      duration: this.courseForm.controls["duration"].getRawValue(),
      title: this.courseForm.controls["title"].getRawValue(),
    };
    this.create.emit(course);
  }

  onCancel() {
    this.location.back();
  }
}
