import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder, FormControl, FormGroup, Validators
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

interface Author {
  id: number,
  name: string
}

let currentId = 0;

const generateId = () => {
  return ++currentId;
}

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  courseAuthors: Author[] = [];

  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  courseForm: FormGroup = this.fb.group({
    title: this.fb.control('', [Validators.minLength(2), Validators.required]),
    description: this.fb.control('', [Validators.minLength(2), Validators.required]),
    author: this.fb.control('', [Validators.minLength(2), Validators.pattern(/^[a-z0-9]+$/i)]),
    authors: this.fb.array([]),
    duration: this.fb.control(null, [Validators.min(0), Validators.required])
  });

  onAuthorCreate() {
    if (this.courseForm.controls['author'].touched && this.courseForm.controls['author'].valid) {
      (<FormArray>this.courseForm.controls['authors']).push(this.fb.control({id: generateId(), name: this.courseForm.controls['author'].value}));
      this.courseForm.controls['author'].setValue('');
    }
  }

  onAuthorRemove(id: number) {
    const removedAuthor = this.courseAuthors.find(author => author.id === id);
    this.courseAuthors = this.courseAuthors.filter(author => author.id !== id);
    (<FormArray>this.courseForm.controls['authors']).push(this.fb.control(removedAuthor));    
  }

  onAuthorAdd(id: number) {
    const addedAuthorIndex = (<FormArray>this.courseForm.controls['authors']).getRawValue().findIndex(author => author.id === id);
    const addedAuthor = (<FormArray>this.courseForm.controls['authors']).getRawValue().at(addedAuthorIndex);
    (<FormArray>this.courseForm.controls['authors']).removeAt(addedAuthorIndex);
    this.courseAuthors.push(addedAuthor);
  }
}
