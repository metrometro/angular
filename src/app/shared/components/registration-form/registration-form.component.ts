import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EmailValidatorDirective } from "@app/shared/directives/email.directive";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent {
  registrationForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(6)]),
    email: new FormControl("", [Validators.required, new EmailValidatorDirective().validate]),
    password: new FormControl("", [Validators.required]),
  });
}
