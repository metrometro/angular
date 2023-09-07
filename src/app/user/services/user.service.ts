import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { UserModel } from "@app/models/user.model";

export interface SuccessfulRequest<T> {
  successful: boolean;
  result: T;
}

const API_URL = "http://localhost:4000";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get<SuccessfulRequest<UserModel>>(`${API_URL}/users/me`);
  }
}
