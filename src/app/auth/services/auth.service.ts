import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { SessionStorageService } from "./session-storage.service";
import { SuccessfulRequest } from "@app/models/request.model";

const API_URL = "http://localhost:4000";

interface UserModel {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface FailedRequest {
  successful: false;
  message?: string;
  errors?: string[];
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthorized$$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

  constructor(
    private sessionStorage: SessionStorageService,
    private http: HttpClient
  ) {}

  login(user: UserModel) {
    this.http
      .post<SuccessfulRequest<string> | FailedRequest>(
        `${API_URL}${"/login"}`,
        user
      )
      .subscribe((r) => {
        if (r.successful) {
          this.sessionStorage.setToken(r.result);
          this.isAuthorised = true;
        } else {
          this.isAuthorised = false;
        }
      });
  }

  logout() {
    this.sessionStorage.deleteToken();
    this.isAuthorized$$ = new BehaviorSubject(false);
  }

  register(user: UserModel) {
    this.http
      .post<SuccessfulRequest<string> | FailedRequest>(
        `${API_URL}${"register"}`,
        user
      )
      .subscribe();
  }

  get isAuthorised() {
    return this.isAuthorized$$.getValue();
    // return true;
  }

  set isAuthorised(value: boolean) {
    this.isAuthorized$$.next(value);
  }

  getLoginUrl() {
    return "http://localhost:4200/login";
  }
}
