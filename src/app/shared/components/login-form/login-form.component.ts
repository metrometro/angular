import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "@app/auth/services/auth.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;

  model = {
    email: "",
    password: "",
  };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login({
      email: this.model.email,
      name: "",
      password: this.model.password,
      role: "",
    });
    this.authService.isAuthorized$.subscribe(v => {
      if (v) {
        this.router.navigate([`/courses`]);
      }
    });
  }

  onRegistrationClick() {
    this.router.navigate(['/registration']);
  }
}
